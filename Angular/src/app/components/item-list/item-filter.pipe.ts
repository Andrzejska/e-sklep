import { PipeTransform, Pipe } from '@angular/core';
import { Item } from 'src/app/models/itemElements';

@Pipe({ name: 'searchPipe' })
export class SearchPipe implements PipeTransform {
    transform(courses: Item[], searchTerm: string): Item[] {
        if (!courses)
            return [];
        if (!searchTerm)
            return courses;
        searchTerm = searchTerm.toLowerCase();
        return courses.filter(course => {
            return course.name.toLowerCase().includes(searchTerm);
        });
    }
}

