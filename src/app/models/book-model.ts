export class Book {
    id?: number; // Optional id property for existing books
    title: string;
    author: string;
    publisher: string;
    releaseDate: Date;
    pages: number;
    description: string;
    status: string;
    readpages: number;
    rating: number;
    image?: string; // Optional imageUrl property
  
    constructor(
      title: string,
      author: string,
      publisher: string,
      releaseDate: Date,
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
      this.releaseDate = releaseDate;
      this.pages = pages;
      this.description = description;
      this.status = status;
      this.readpages = readpages;
      this.rating = rating;
      this.image = image;
    }
  }