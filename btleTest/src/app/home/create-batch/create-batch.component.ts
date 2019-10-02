import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-create-batch",
  templateUrl: "./create-batch.component.html",
  styleUrls: ["./create-batch.component.scss"]
})
export class CreateBatchComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, "cancel");
  }

  onCreate() {
    this.modalCtrl.dismiss({ message: "Dumy Message" }, "Confirm");
  }
}
