export class Book {
    id?: number;
    title: string;
    author: string;
    publisher: string;
    pages: number;
    description: string;
    status: string;
    readpages: number;
    rating: number;
    image?: string;
  
    constructor(
      title: string,
      author: string,
      publisher: string,
      pages: number,
      description: string,
      status: string,
      readpages: number,
      rating: number,
      image?: string
    ) {
      this.title = title;
      this.author = author;
      this.publisher = publisher;
      this.pages = pages;
      this.description = description;
      this.status = status;
      this.readpages = readpages;
      this.rating = rating;
      this.image = image;
    }
  }