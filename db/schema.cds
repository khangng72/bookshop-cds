using {
    sap,
    managed,
    Currency
} from '@sap/cds/common';


entity Books : managed {
    key ID       : Integer;
        title    : localized String;
        descr    : localized String;
        author   : Association to Authors;
        genre    : Association to Genres;
        stock    : Integer;
        price    : Decimal;
        currency : Currency;
}

entity Authors : managed {
    key ID    : Integer;
        name  : String;
        books : Association to many Books
                    on books.author = $self;
}

entity Genres : sap.common.CodeList {
    key ID     : Integer;
        name   : String;
        parent : Association to Genres;
}
