from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from ..models import Sale
from ..serializers import SaleSerializer

class SaleListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        queryset = Sale.objects.all()
        if not queryset.exists():
            return Response(
                {"message": "Продажи не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = SaleSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)