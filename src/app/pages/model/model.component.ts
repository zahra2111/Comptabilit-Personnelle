import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../services/model/model.service';
import { Model } from '../../services/model/Model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/User/user.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TierService } from '../../services/tier/tier.service';
import { CompteBancaireService } from '../../services/CompteBancaire/compte-bancaire.service';
import { Tier } from '../../services/tier/Tier';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  models: Model[] = [];
  showPopup: boolean = false;
  editingModel: Model | null = null;
  userId: number | 0 = 0;
  searchQuery: string = '';
  tiers: any[] = [];
  comptes: any[] = [];
  selectedTierId: number | null = null;
  selectedCompteId: number | null = null;
  userIden: number | 0 = 0;
  tierMap: { [key: string]: string } = {}; // Maps tier URL to tier name

  constructor(
    private tierService: TierService,
    private compteService: CompteBancaireService,
    private translate: TranslateService,
    private modelService: ModelService,
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadTiers();
    this.loadComptes();
    this.translate.setDefaultLang('fr');
    this.getModels();
    this.fetchTiersAndComptes(); // Fetch tiers and comptes
    if (!this.userIden) {
      this.authService.getCurrentUserId().subscribe(id => {
        this.userIden = id;
      });
    }
    this.authService.getCurrentUserId().subscribe(id => {
      this.userId = id;
      console.log('User ID:', this.userId);
    });
  }

  onTierChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTierId = target.value ? parseInt(target.value, 10) : null;
  }
  extractTierId(tierUrl: string | undefined): number | null {
    if (!tierUrl) {
      console.error('Tier URL is undefined or null');
      return null;
    }
    const matches = tierUrl.match(/\/api\/tiers\/(\d+)/);
    return matches ? +matches[1] : null;
  }

  onCompteChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCompteId = target.value ? parseInt(target.value, 10) : null;
  }
  fetchTiersAndComptes(): void {
    this.tierService.getTiers().subscribe(
      tiers => {
        this.tiers = tiers;
      },
      error => {
        console.error('Error fetching tiers:', error);
        this.snackBar.open('Error fetching tiers', 'Close', { duration: 2000 });
      }
    );

    this.compteService.getCompteBancaires().subscribe(
      comptes => {
        this.comptes = comptes;
      },
      error => {
        console.error('Error fetching comptes:', error);
        this.snackBar.open('Error fetching comptes', 'Close', { duration: 2000 });
      }
    );
  }

  loadTiers(): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.tierService.getTiers().subscribe(tiers => {
          this.tiers = tiers.map((t: any) => new Tier(t.nom, t.adresse, t.commentaire, t.usr, t.transactions, t.id));
        }, error => {
          console.error('Error fetching tiers:', error);
          this.snackBar.open('Error fetching tiers', 'Close', { duration: 2000 });
        });
      }
    }, error => {
      console.error('Error fetching user ID:', error);
      this.snackBar.open('Error fetching user ID. Please try again later.', 'Close', { duration: 2000 });
    });
  }
  loadComptes(): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.userService.getBanks(userId).subscribe(budgets => {
          this.comptes = budgets;
        }, error => {
          console.error('Error fetching budgets:', error);
        });
      }
    }, error => {
      console.error('Error fetching user ID:', error);
    });
  }
  getModels(): void {
 
    this.modelService.getModels().subscribe(
      models => {
        this.models = models;
      }, error => {
        console.error('Error fetching models:', error);
      });
    
  }

  filteredModels() {
    if (!this.searchQuery) {
      return this.models;
    }
    const query = this.searchQuery.toLowerCase();
    return this.models.filter(model =>
      model.description.toLowerCase().includes(query) ||
      model.type.toLowerCase().includes(query)
    );
  }

  openPopup(model?: Model): void {
    this.editingModel = model ? { ...model } : null;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
    this.editingModel = null;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const model = new Model(
        form.value.name,
        parseFloat(form.value.defaultAmount),
        form.value.defaultType,
         `api/users/${this.userIden}`,
        `api/banks/${this.selectedCompteId}`,
        `api/tiers/${this.selectedTierId}`,

      );

      if (this.editingModel) {
        // Update existing model
        this.modelService.modifyModel(this.editingModel.id!, model)
          .subscribe(response => {
            console.log('Model updated successfully', response);
            this.snackBar.open(this.translate.instant('MODEL_UPDATE_SUCCESS'), this.translate.instant('CLOSE'), { duration: 2000 });
            this.getModels(); // Refresh the list
            this.closePopup(); // Close the popup
          }, error => {
            console.error('Error updating model', error);
            this.snackBar.open(this.translate.instant('MODEL_UPDATE_FAIL'), this.translate.instant('CLOSE'), { duration: 2000 });
          });
      } else {
        // Add new model
        this.modelService.addModel(model)
          .subscribe(response => {
            console.log('Model added successfully', response);
            this.snackBar.open(this.translate.instant('MODEL_ADD_SUCCESS'), this.translate.instant('CLOSE'), { duration: 2000 });
            this.getModels(); // Refresh the list
            this.closePopup(); // Close the popup
          }, error => {
            console.error('Error adding model', error);
            this.snackBar.open(this.translate.instant('MODEL_ADD_FAIL'), this.translate.instant('CLOSE'), { duration: 2000 });
          });
      }

      form.resetForm();
    }
  }

  deleteModel(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
      data: {
        title: 'DELETE_CONFIRMATION_MODEL',
        message: 'DELETE_CONFIRMATION_MESSAGE_MODEL'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.modelService.deleteModel(id)
          .subscribe(response => {
            this.snackBar.open(this.translate.instant('MODEL_DELETE_SUCCESS'), this.translate.instant('CLOSE'), { duration: 2000 });
            this.getModels(); // Refresh the list
          }, error => {
            console.error('Error deleting model', error);
            this.snackBar.open(this.translate.instant('MODEL_DELETE_FAIL'), this.translate.instant('CLOSE'), { duration: 2000 });
          });
      }
    });
  }
}
