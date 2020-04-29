import { PipeTransform, Pipe } from '@angular/core';
import { Item } from 'src/app/models/itemElements';

@Pipe({ name: 'SearchPipeCategoty' })
export class SearchPipeCategoty implements PipeTransform {
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





// @Pipe({ name: 'searchPipeRate' })
// export class SearchPipeRate implements PipeTransform {
//     transform(courses: Course[], searchTerm: string): Course[] {
//         if (!courses)
//             return [];
//         if (!searchTerm)
//             return courses;
//         const search = searchTerm.toString();
//         return courses.filter(course => {
//             var rate: string = "null";
//             if (course.rating != null) {
//                 rate = course.rating.toString()
//             }
//             return rate.includes(search);
//         });
//     }
// }