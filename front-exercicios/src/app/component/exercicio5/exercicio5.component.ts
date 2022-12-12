import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api-service.service';

interface Marca {
  marca: string
}
@Component({
  selector: 'app-exercicio5',
  templateUrl: './exercicio5.component.html',
  styleUrls: ['./exercicio5.component.css']
})
export class Exercicio5Component {

  formulario: FormGroup;
  submitted = false;
  formValido: boolean = false;
  isLoading: boolean = false;

  veiculo = new FormControl('', [Validators.required]);
  marca = new FormControl('', [Validators.required]);
  descricao = new FormControl('', [Validators.required]);
  ano = new FormControl('', [Validators.required]);
  vendido = new FormControl(false, [Validators.required]);

  marcas: Marca[];
  selectedMarca?: Marca;

  veiculos: any[] = [];
  clonedVeiculos: { [s: string]: any; } = {};
  veiculos1: any[] = [];
  veiculos2: any[] = [];

  constructor(private apiService: ApiService,
              private formBuilder: FormBuilder) {
      this.formulario = this.formBuilder.group({
        veiculo: this.veiculo,
        marca: this.marca,
        descricao: this.descricao,
        ano: this.ano,
        vendido: this.vendido
      });

      this.marcas = [
        {marca: 'Chevrolet'},
        {marca: 'Fiat'},
        {marca: 'Ford'},
        {marca: 'Tesla'},
        {marca: 'Toyota'},
        {marca: 'Volkswagen'}
      ];
  }

  ngOnInit(){
    this.carregarVeiculos();
  }

  criar(){
    this.isLoading = true;
    if (this.formulario.valid) {
      this.apiService.setVeiculo(this.formulario.value).subscribe((resposta: any) =>{
        this.carregarVeiculos();
      });
      this.formulario.reset();
      this.formulario.controls['vendido'].setValue(false);
    } else {
      this.validateAllFormFields(this.formulario);
    }

  }

  carregarVeiculos(){
    this.apiService.getVeiculos().subscribe((resultado: any) => {
        this.veiculos = resultado;
        this.formatarData();
        console.log(this.veiculos);
    });
  }

  formatarData(){
    this.veiculos.forEach((item: any) =>{
        item.created = new Date(item.created).toLocaleDateString();
        item.updated = new Date(item.updated).toLocaleDateString();
    })
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getErrorMessageVeiculo() {
    return this.veiculo.hasError('required') ? 'O campo Veiculo é obrigatório.' : '';
  }

  getErrorMessageDescricao(){
    return this.descricao.hasError('required') ? 'O campo Descrição é obrigatório.' : '';
  }

  getErrorMessageAno(){
    return this.ano.hasError('required') ? 'O campo Ano é obrigatório.' : '';
  }

  getErrorMessageVendido(){
    return this.vendido.hasError('required') ? 'O campo Vendido é obrigatório.' : '';
  }

  getErrorMessageMarca() {
    return this.marca.hasError('required') ? 'O campo Marca é obrigatório.' : '';
  }

  onRowEditInit(veiculo: any) {
    this.clonedVeiculos[veiculo.id] = {...veiculo};
  }

  onRowEditSave(item: any) {
    let veiculo: any = {};

    veiculo.veiculo = item.veiculo;
    veiculo.marca = item.marca;
    veiculo.ano = item.ano;
    veiculo.descricao = item.descricao;
    veiculo.vendido = item.vendido;

    this.apiService.atualizaVeiculo(veiculo, item.id).subscribe((respostas) =>{
      console.log(respostas);
      this.carregarVeiculos();
    })

  }

  onRowEditCancel(veiculo: any, index: number) {
    this.veiculos2[index] = this.clonedVeiculos[veiculo.id];
    delete this.clonedVeiculos[veiculo.id];
  }

  deletaVeiculo(veiculo: any){
    this.apiService.deletaVeiculo(veiculo.id).subscribe((retorno: any) => {
      this.carregarVeiculos();
    })
  }
} 