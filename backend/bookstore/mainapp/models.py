from django.db import models
from django.contrib.auth.models import AbstractUser

class Author(models.Model):
    author_last_name = models.CharField(max_length=30)
    author_first_name = models.CharField(max_length=30)
    author_patronymic = models.CharField(max_length=30, null=True, blank=True)

class Category(models.Model):
    title = models.CharField(max_length=30)

class Book(models.Model):
    title = models.CharField(max_length=50)
    publishing = models.CharField(max_length=100)
    price = models.FloatField()
    number_of_copies = models.IntegerField()
    description = models.CharField(max_length=300, null=True, blank=True)
    status = models.CharField(max_length=50)
    keywords = models.CharField(max_length=300, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    cover_image = models.ImageField(upload_to='book_covers/', blank=True, null=True)

    authors = models.ManyToManyField(Author, through='Author_Book')

class User(AbstractUser):
    lastname = models.CharField(max_length=30)
    username = models.CharField(max_length=150, null=True, blank=True)
    patronymic = models.CharField(max_length=30, null=True, blank=True)
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"  # Авторизация по email
    REQUIRED_FIELDS = ["lastname", "username"]
    def __str__(self):
        return self.email

class Author_Book(models.Model):
    author = models.ForeignKey(Author, on_delete=models.DO_NOTHING)
    book = models.ForeignKey(Book, on_delete=models.DO_NOTHING)

    class Meta:
        unique_together = (('author', 'book'),)

class Basket(models.Model):
    book = models.ForeignKey(Book, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    number_of_copies = models.IntegerField()

    class Meta:
        unique_together = (('book', 'user'),)

class Storage(models.Model):
    name = models.CharField(max_length=40)
    count = models.IntegerField(null=True, blank=True)

class Book_Storage(models.Model):
    storage = models.ForeignKey(Storage, on_delete=models.DO_NOTHING)
    book = models.ForeignKey(Book, on_delete=models.DO_NOTHING)
    quantity = models.IntegerField()

    class Meta:
        unique_together = (('storage', 'book'),)

class Entrance(models.Model):
    dateTime = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)

class Book_entrance(models.Model):
    book = models.ForeignKey(Book, on_delete=models.DO_NOTHING)
    entrance = models.ForeignKey(Entrance, on_delete=models.DO_NOTHING)
    quantity = models.IntegerField()

    class Meta:
        unique_together = (('book', 'entrance'),)

class Sale(models.Model):
    final_price = models.FloatField()
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)

class Sale_Book(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.DO_NOTHING)
    book = models.ForeignKey(Book, on_delete=models.DO_NOTHING)
    quantity = models.IntegerField()

    class Meta:
        unique_together = (('sale', 'book'),)

class Writeoff(models.Model):
    reason = models.CharField(max_length=100)
    quantity = models.IntegerField()
    dateTime = models.DateTimeField()
    book = models.ForeignKey(Book, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)