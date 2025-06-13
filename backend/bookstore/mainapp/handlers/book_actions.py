from datetime import timezone

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from django.db import transaction
from ..serializers import *
from ..models import *

class AuthorListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "Авторы не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(queryset, many=True)

        last_names = sorted({author.get('author_last_name') for author in serializer.data if author.get('author_last_name')})
        first_names = sorted({author.get('author_first_name') for author in serializer.data if author.get('author_first_name')})
        patronymics = sorted({author.get('author_patronymic') for author in serializer.data if author.get('author_patronymic')})

        return Response({
            "last_names": last_names,
            "first_names": first_names,
            "patronymics": patronymics
        }, status=status.HTTP_200_OK)


class BooksView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        try:
            serializer = BookCreateUpdateSerializer(data=request.data)
            if serializer.is_valid():
                book = serializer.save()

                entrance = Entrance.objects.create(
                    dateTime=timezone.now(),
                    user=request.user
                )

                Book_entrance.objects.create(
                    book=book,
                    entrance=entrance,
                    quantity=book.number_of_copies
                )

                storage = Storage.objects.filter(name="Склад").first()
                if not storage:
                    return Response({"error": "Склад не найден"}, status=status.HTTP_400_BAD_REQUEST)

                Book_Storage.objects.create(
                    book=book,
                    storage=storage,
                    quantity=book.number_of_copies
                )

                return Response("Книга успешно добавлена", status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(e)
            return Response({"error": "Произошла ошибка при добавлении книги"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @transaction.atomic
    def put(self, request, book_id):
        try:
            book = Book.objects.get(pk=book_id)
            serializer = BookCreateUpdateSerializer(instance=book, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response("Изменения сохранены", status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Book.DoesNotExist:
            return Response({"error": "Книга не найдена"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": "Произошла ошибка при обновлении книги"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, book_id):
        try:
            book = Book.objects.get(pk=book_id)
            if book.number_of_copies > 0:
                return Response({"error": "Нельзя удалить книгу, так как у нее есть экземпляры в наличии"},
                                status=status.HTTP_400_BAD_REQUEST)
            Author_Book.objects.filter(book=book).delete()
            Book_Storage.objects.filter(book=book).delete()
            Book_entrance.objects.filter(book=book).delete()
            Sale_Book.objects.filter(book=book).delete()
            book.delete()
            return Response("Книга успешно удалена", status=status.HTTP_204_NO_CONTENT)
        except Book.DoesNotExist:
            return Response({"error": "Книга не найдена"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({"error": "Произошла ошибка при удалении книги"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request, book_id):
        try:
            book = Book.objects.get(pk=book_id)
            serializer = BookSerializer(book)
        except Book.DoesNotExist:
            return Response({"error": "Книга не найдена"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

