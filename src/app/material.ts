import {MatButtonModule} from '@angular/material/button';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';


@NgModule({
    imports:[MatButtonModule,MatToolbarModule,MatIconModule,MatInputModule,MatFormFieldModule,MatSnackBarModule,MatCardModule],
    exports:[MatButtonModule,MatToolbarModule,MatIconModule,MatInputModule,MatFormFieldModule,MatSnackBarModule,MatCardModule]
})

export class MaterialModule{

}