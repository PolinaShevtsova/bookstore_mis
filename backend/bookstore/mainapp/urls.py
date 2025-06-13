from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .handlers.catalog_page import *
from .handlers.book_actions import *
from .handlers.authentification import *
from .handlers.detail_book import *
from .handlers.entrance import *
from .handlers.sale import *
from .handlers.writeoff import *
from .handlers.shelving import *
from .handlers.distribution import *

urlpatterns = ([
    path('entrances/', EntranceListView.as_view(), name='entrance-list'),
    path('writeoffs/', WriteoffListView.as_view(), name='writeoff-list'),
    path('sales/', SaleListView.as_view(), name='sale-list'),
    path('storage/', StorageBulkAPIView.as_view(), name='storage'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('books/', BookListView.as_view(), name='book-list'),
    path('books/sorted/', SortedBooksView.as_view(), name='sorted-books'),
    path('books/<int:id>/', BookDetailView.as_view(), name='book-detail'),
    path('distribution/', DistributionListView.as_view(), name='book-distribution'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected/', ProtectedView.as_view(), name='protected'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('books/create/', BooksView.as_view(), name='book-create'),
    path('books/update/<int:book_id>/', BooksView.as_view(), name='book-update'),
    path('books/update_info/<int:book_id>/', BooksView.as_view(), name='book-update-info'),
    path('books/delete/<int:book_id>/', BooksView.as_view(), name='book-delete'),
    path('authors/', AuthorListView.as_view(), name='author-list'),
    path('register/', RegisterView.as_view(), name='register')
])