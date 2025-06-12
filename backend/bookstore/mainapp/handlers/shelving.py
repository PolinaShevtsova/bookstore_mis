from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Storage
from ..serializers import StorageOnlySerializer

class StorageBulkAPIView(APIView):
    def get(self, request):
        storages = Storage.objects.all().filter(name="Стеллаж")
        serializer = StorageOnlySerializer(storages, many=True)
        return Response(serializer.data)

    def put(self, request):
        data = request.data
        if not isinstance(data, list):
            return Response({"error": "Ожидается список объектов."}, status=status.HTTP_400_BAD_REQUEST)

        incoming_ids = [item.get("id") for item in data if item.get("id") is not None]
        existing_stellages = Storage.objects.filter(name="Стеллаж").in_bulk(incoming_ids)
        updated_items = []
        processed_ids = []

        for item in data:
            storage_id = item.get("id")
            if storage_id and storage_id in existing_stellages:
                # Обновление только существующих стеллажей
                instance = existing_stellages[storage_id]
                serializer = StorageOnlySerializer(instance, data=item)
            else:
                # Создание нового стеллажа с именем "Стеллаж"
                serializer = StorageOnlySerializer(data=item)

            if serializer.is_valid():
                obj = serializer.save()
                # Устанавливаем name = "Стеллаж" при создании (если не обновление)
                if not storage_id:
                    obj.name = "Стеллаж"
                    obj.save()

                updated_items.append(StorageOnlySerializer(obj).data)
                processed_ids.append(obj.id)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Удаляем только те стеллажи с name="Стеллаж", которых нет в переданном списке
        Storage.objects.filter(name="Стеллаж").exclude(id__in=processed_ids).delete()

        return Response(updated_items, status=status.HTTP_200_OK)