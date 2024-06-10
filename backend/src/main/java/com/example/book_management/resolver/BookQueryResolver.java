package com.example.book_management.resolver;



import com.example.book_management.enntity.Book;
import com.example.book_management.service.BookService;

// import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookQueryResolver  {

    @Autowired
    private BookService bookService;

    public List<Book> getBooks() {
        return bookService.getAllBooks();
    }
}
