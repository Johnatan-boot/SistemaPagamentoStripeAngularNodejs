import { RestService } from './../../../../shared/services/restservice/rest.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Toaster } from "ngx-toast-notifications";
import { Router } from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public contentFG: FormGroup = new FormGroup({
    logo: new FormControl("assets/braun-weiss-logo.webp"),
    subtitle: new FormControl("Enter the amount and invoice # to pay."),
    price: new FormControl(0.00, [Validators.required]),
    invoice: new FormControl(null, [Validators.required])
  });
    public form: FormGroup = new FormGroup({})

    constructor(private restService: RestService, private fb: FormBuilder,
        private router: Router,
        private toaster: Toaster) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            amount: ['', [Validators.required, Validators.min(5)]],
            email: ['', [Validators.required]]
        })
    }

    init(): void {
        try {
            this.restService.generateOrder(this.form.value)
                .subscribe(({ data }) => {
                    this.router.navigate(['/', 'checkout', data?.localizator])
                })
        } catch (e) {
            this.toaster.open({ text: 'Algo ocurrio', caption: 'ERROR' })
        }
    }

}
