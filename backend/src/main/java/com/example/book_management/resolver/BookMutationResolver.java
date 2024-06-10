package com.example.book_management.resolver;

import com.example.book_management.enntity.Book;
import com.example.book_management.service.BookService;
// import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookMutationResolver {

    @Autowired
    private BookService bookService;

    public Book addBook(String title, String author, String description) {
        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setDescription(description);
        return bookService.addBook(book);
    }

    public Book editBook(Long id, String title, String author, String description) {
        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setDescription(description);
        return bookService.editBook(id, book);
    }

    public String deleteBook(Long id) {
        bookService.deleteBook(id);
        return "Book deleted";
    }
}