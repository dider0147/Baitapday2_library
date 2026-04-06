export class Book{
    constructor(
        public id: number, 
        public title: string, 
        public author: string,
        public publishedYear: number, 
        public genre: string
    ) { }

    updateInfo(title: string, author: string, publishedYear: number, genre: string): void {
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.genre = genre;
    }

    getDescription(): string {
        return `${this.title} by ${this.author}, published in ${this.publishedYear}, is a ${this.genre} book.`;
    }
}