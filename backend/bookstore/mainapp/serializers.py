import json

from rest_framework import serializers
from .models import *

from django.contrib.auth.hashers import check_password
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken

from django.utils import timezone
from rest_framework.reverse import reverse
from django.conf import settings

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name']

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['author_last_name', 'author_first_name', 'author_patronymic']

class ShortBookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['title', 'authors']

class BookSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    authors = AuthorSerializer(many=True, read_only=True)
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = [
            'id', 'title', 'publishing', 'price', 'number_of_copies',
            'description', 'status', 'keywords', 'category', 'cover_image',
            'authors'
        ]

    def get_cover_image(self, obj):
        # request = self.context.get('request')
        if obj.cover_image:
            return f'{settings.SITE_DOMAIN}{obj.cover_image.url}'

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ("email", "username", "lastname", "patronymic", "phone_number", "password", "password2")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Пароли не совпадают"})
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        return User.objects.create_user(**validated_data)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    User = get_user_model()
    username_field = 'email'

    def validate(self, attrs):
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password')
        }
        user = User.objects.filter(email=credentials['email']).first()

        if user and user.check_password(credentials['password']):

            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            if not OutstandingToken.objects.filter(jti=access['jti']).exists():
                OutstandingToken.objects.create(
                    user=user,
                    token=str(access),
                    jti=access['jti'],
                    expires_at=timezone.make_aware(timezone.datetime.fromtimestamp(access['exp'])),
                    created_at=timezone.now()
                )

            data = {
                'refresh': str(refresh),
                'access': str(access),
                'email': user.email
            }
            return data
        else:
            raise serializers.ValidationError('Неверный email или пароль')

class BookCreateUpdateSerializer(serializers.ModelSerializer):
    authors_data_json = serializers.CharField(write_only=True, required=False, allow_blank=True)

    def validate_price(self, value):
        if value is not None:
            return round(float(value), 2)
        return value

    def validate_cover_image(self, value):
        if value in (None, "", "null", 'null'):
            return None
        return value

    class Meta:
        model = Book
        fields = '__all__'

    def create(self, validated_data):
        authors_json_str = validated_data.pop('authors_data_json', '[]')
        authors_data = []

        if authors_json_str:
            try:
                authors_data = json.loads(authors_json_str)
            except json.JSONDecodeError:
                raise serializers.ValidationError({"authors_data_json": "Некорректный формат JSON для авторов."})

        book = Book.objects.create(**validated_data)

        if authors_data:
            if not isinstance(authors_data, list):
                 raise serializers.ValidationError({"authors_data_json": "Авторы должны быть списком объектов."})

            for author_data in authors_data:
                if not isinstance(author_data, dict):
                    raise serializers.ValidationError({"authors_data_json": "Каждый автор должен быть объектом."})
                if 'author_last_name' not in author_data or 'author_first_name' not in author_data:
                    raise serializers.ValidationError({"authors_data_json": "Для каждого автора необходимы 'author_last_name' и 'author_first_name'."})

                author, created = Author.objects.get_or_create(
                    author_last_name=author_data['author_last_name'],
                    author_first_name=author_data['author_first_name'],
                    defaults={'author_patronymic': author_data.get('author_patronymic')})
                Author_Book.objects.create(book=book, author=author)
        return book

    def update(self, instance, validated_data):
        authors_json_str = validated_data.pop('authors_data_json', None)
        authors_data = []

        if authors_json_str is not None:
            try:
                authors_data = json.loads(authors_json_str)
            except json.JSONDecodeError:
                raise serializers.ValidationError({"authors_data_json": "Некорректный формат JSON для авторов."})

            Author_Book.objects.filter(book=instance).delete()
            if authors_data:
                if not isinstance(authors_data, list):
                     raise serializers.ValidationError({"authors_data_json": "Авторы должны быть списком объектов."})

                for author_data in authors_data:
                    if not isinstance(author_data, dict):
                        raise serializers.ValidationError({"authors_data_json": "Каждый автор должен быть объектом."})
                    if 'author_last_name' not in author_data or 'author_first_name' not in author_data:
                        raise serializers.ValidationError({"authors_data_json": "Для каждого автора необходимы 'author_last_name' и 'author_first_name'."})

                    author, created = Author.objects.get_or_create(
                        author_last_name=author_data['author_last_name'],
                        author_first_name=author_data['author_first_name'],
                        defaults={'author_patronymic': author_data.get('author_patronymic')})
                    Author_Book.objects.create(book=instance, author=author)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

#Entrance
class BookEntranceNestedSerializer(serializers.ModelSerializer):
    book = ShortBookSerializer()

    class Meta:
        model = Book_entrance
        fields = ['book', 'quantity']

class EntranceDetailSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField()
    books = serializers.SerializerMethodField()

    class Meta:
        model = Entrance
        fields = ['id', 'dateTime', 'seller', 'books']

    def get_books(self, obj):
        entries = Book_entrance.objects.filter(entrance=obj)
        return BookEntranceNestedSerializer(entries, many=True).data

#Storage
class StorageOnlySerializer(serializers.ModelSerializer):
    has_books = serializers.SerializerMethodField()
    class Meta:
        model = Storage
        fields = ['id', 'count', 'has_books']

    def create(self, validated_data):
        validated_data['name'] = 'Стеллаж'  # Проставляем по умолчанию
        return super().create(validated_data)
    def get_has_books(self, obj):
        return obj.book_storage_set.exists()

class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ['id', 'name', 'count']

class ShortStorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ['id', 'name']

class BookStorageNestedSerializer(serializers.ModelSerializer):
    storage = StorageSerializer()
    book = ShortBookSerializer()

    class Meta:
        model = Book_Storage
        fields = ['book', 'storage', 'quantity']

#Sale
class SaleBookNestedSerializer(serializers.ModelSerializer):
    book = ShortBookSerializer()

    class Meta:
        model = Sale_Book
        fields = ['book', 'quantity']

class SaleSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField()
    books = serializers.SerializerMethodField()

    class Meta:
        model = Sale
        fields = ['id', 'final_price', 'date', 'seller', 'books']

    def get_books(self, obj):
        sale_books = Sale_Book.objects.filter(sale=obj)
        return SaleBookNestedSerializer(sale_books, many=True).data

#Writeoff
class WriteoffSerializer(serializers.ModelSerializer):
    book = ShortBookSerializer()
    seller = serializers.StringRelatedField()

    class Meta:
        model = Writeoff
        fields = ['id', 'reason', 'quantity', 'dateTime', 'book', 'seller']