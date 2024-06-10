// package com.example.book_management.resolver;


// import graphql.GraphQLError;
// import graphql.servlet.GraphQLErrorHandler;
// import org.springframework.stereotype.Component;

// import java.util.List;
// import java.util.stream.Collectors;

// @Component
// public class GraphQLErrorHandler implements GraphQLErrorHandler {

//     @Override
//     public List<GraphQLError> processErrors(List<GraphQLError> errors) {
//         return errors.stream()
//                 .map(error -> {
//                     if (error instanceof Throwable) {
//                         return new GraphQLExceptionWrapper((Throwable) error);
//                     }
//                     return error;
//                 })
//                 .collect(Collectors.toList());
//     }
// }
