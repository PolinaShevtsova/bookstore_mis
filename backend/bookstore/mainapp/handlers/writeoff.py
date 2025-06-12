from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from ..models import Writeoff
from ..serializers import WriteoffSerializer

class WriteoffListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        queryset = Writeoff.objects.all()
        if not queryset.exists():
            return Response(
                {"message": "Списания не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = WriteoffSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)