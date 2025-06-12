from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from ..models import *
from ..serializers import *

class DistributionListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            # Получаем все записи связей книга-склад
            book_storages = Book_Storage.objects.select_related('storage', 'book') \
                .prefetch_related('book__authors')

            grouped = {}

            for bs in book_storages:
                book = bs.book
                book_id = book.id

                # сериализуем кратко книгу
                book_data = ShortBookSerializer(book).data
                storage_data = ShortStorageSerializer(bs.storage).data
                storage_data['quantity'] = bs.quantity  # добавляем количество

                if book_id not in grouped:
                    grouped[book_id] = {
                        "book": book_data,
                        "storages": []
                    }

                grouped[book_id]["storages"].append(storage_data)

            return Response(list(grouped.values()), status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)