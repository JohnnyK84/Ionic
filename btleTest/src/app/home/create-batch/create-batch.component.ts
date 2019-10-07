import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BtleServiceService } from "../btle-service.service";

@Component({
  selector: "app-create-batch",
  templateUrl: "./create-batch.component.html",
  styleUrls: ["./create-batch.component.scss"]
})
export class CreateBatchComponent implements OnInit {
  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private btleService: BtleServiceService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      location: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      })
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, "cancel");
  }

  onCreate() {
    if (!this.form.valid) {
      alert(
        "Form not valid\n Please ensure you have filled out the required fields"
      );
      return;
    }
    this.btleService.newBatch(
      +this.form.value.id,
      this.form.value.location,
      this.form.value.description
    );
  }
}
