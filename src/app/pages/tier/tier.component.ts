import { Component, OnInit } from '@angular/core';
import { TierService } from '../../services/tier/tier.service';
import { Tier } from '../../services/tier/Tier';
import { MatDialog } from '@angular/material/dialog';
import { AddTierComponent } from '../addtier/add-tier/add-tier.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tier',
  templateUrl: './tier.component.html',
  styleUrls: ['./tier.component.scss']
})
export class TierComponent implements OnInit {
  tiers: Tier[] = [];
  filteredTiers: Tier[] = [];
  searchQuery: string = '';
  errorMessage: string | null = null;
  isLoading = true;
  userIden: number | 0 = 0;

  constructor(
    public dialog: MatDialog,
    private tierService: TierService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTiers();
    this.authService.getCurrentUserId().subscribe(id => {
      this.userIden = id;
      console.log('User ID:', this.userIden);
    });
  }

  openAddTierDialog(): void {
    const dialogRef = this.dialog.open(AddTierComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const t = new Tier(
          result.nom,
          result.adresse,
          result.commentaire,
          `api/users/${this.userIden}`, // Construct the IRI for user reference
          result.transactions // Transactions IRI
        );
        
        this.tierService.addTier(t)
          .subscribe(response => {
            console.log('Tier added successfully', response);
            this.loadTiers();
          }, error => {
            console.error('Error adding tier', error);
          });
      }
    });
  }

  deleteTier(tierId: number | undefined): void {
    if (tierId === undefined) {
      console.error('Tier ID is undefined');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tierService.deleteTier(tierId).subscribe(
          () => {
            this.tiers = this.tiers.filter(tier => tier.id !== tierId);
            this.filterTiers(); // Ensure filtered list is updated
            this.snackBar.open('Tier deleted successfully', 'Close', { duration: 2000 });
          },
          error => {
            console.error('Error deleting tier', error);
            this.snackBar.open('Error deleting tier', 'Close', { duration: 2000 });
          }
        );
      }
    });
  }

  loadTiers(): void {
    this.isLoading = true;
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.tierService.getTiers().subscribe(tiers => {
          this.tiers = tiers;
          this.filterTiers(); // Initialize filtered tiers
          this.isLoading = false;
        }, error => {
          console.error('Error fetching tiers:', error);
          this.errorMessage = 'Error fetching tiers. Please try again later.';
          this.isLoading = false;
        });
      } else {
        console.error('User ID is not available');
        this.errorMessage = 'User ID is not available. Please log in again.';
        this.isLoading = false;
      }
    }, error => {
      console.error('Error fetching user ID:', error);
      this.errorMessage = 'Error fetching user ID. Please try again later.';
      this.isLoading = false;
    });
  }

  filterTiers(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredTiers = this.tiers.filter(tier =>
      tier.nom.toLowerCase().includes(query) ||
      tier.adresse.toLowerCase().includes(query) ||
      tier.commentaire.toLowerCase().includes(query)
    );
  }
}
