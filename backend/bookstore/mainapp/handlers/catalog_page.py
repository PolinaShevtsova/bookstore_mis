from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status, permissions
from ..serializers import *
from ..models import *

class CategoryListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "Категории не найдены"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BookListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Book.objects.prefetch_related('authors').all()
    serializer_class = BookSerializer

    def get(self, request, *args, **kwargs):
        if not self.queryset.exists():
            return Response(
                {"message": "Книги не найдены"},
                status=status.HTTP_200_OK
            )
        return super().get(request, *args, **kwargs)