import { Component, OnInit,Input } from '@angular/core';
import { TokenStorageService } from '@myapp/_services/token-storage.service';
import {Router} from '@angular/router';
import { NotificationService } from '@myapp/_services/notificationService';
@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  mySubscription: any;
  @Input() deviceXs:boolean; 

  constructor(private tokenStorageService: TokenStorageService,
    private router:Router,
    private notificationService:NotificationService) {
      
    }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes("ROLE_ADMIN");
      this.username = user.fullname;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
    this.notificationService.openSnackBar("You have successfully logged out","msg");
  }

  home():void{
    this.router.navigate(['home']);
  }
  
  admin():void{
    this.router.navigate(['admin']);
  }
  
  profile():void{
    this.router.navigate(['profile']);
  }

}
