from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from ..models import Entrance
from ..serializers import EntranceDetailSerializer

class EntranceListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        queryset = Entrance.objects.all()
        if not queryset.exists():
            return Response(
                {"message": "Списания не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = EntranceDetailSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
