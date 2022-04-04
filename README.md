# Open-Smart-Fit

This library was created in order to retrieve information about Smart Fit gyms

## What is?

Um pacote com a listagem de todas as academias da "Smart Fit" recuperadas do site "smartfit.com.br". Este aplicativo funciona corretamente com a versão do site obtida em 2022-04-04.

## Installation (Not yet)

Install the package from the [npmjs.com](npmjs.com) repository.

```shell
npm i @andsfonseca/open-smart-fit
```

## Usage

### Importation

To perform the import via Javascript

```js
var Word = require('@andsfonseca/open-smart-fit').Gyms;
```

To perform the import via Typescript

```ts
import { Gyms } from '@andsfonseca/open-smart-fit'
```

### Functions

* #### getRawData ()

Description

```ts
let locations: ILocations[] = await Gyms.getRawData()
```

### Interfaces

* ### ILocation

Description

```ts
interface IWordleValidation {
    word: string,
    contains: boolean,
    exact: boolean
}
```
|       Propriedade    |    Descrição            |
|:--------------------:|:-------------------------:|
| word                 | Letra.       | 
| contains             | Se a letra está na palavra. |
| exact                | Se a letra está na posição correta. |

## Data Cleaning

To ignore unnecessary and useless information, attributes are rearranged to a more appropriate format, including more convenient information.

Each information is represented as general or additional. General information is always retrieved and additional information only if the user requests it externally.

|       Property    |    Type            |    Implemented            |
|:--------------------:|:-------------------------:|:-----------:|
| id                 | general       | ✅ Yes.       | 
| cnpj                 | additional       | ✅ Yes.       | 

## Issues

Feel free to submit issues and enhancement requests.

## Contribution

1. Fork the project
2. Create a _branch_ for your modification (`git checkout -b my-new-resource`)
3. Do the _commit_ (`git commit -am 'Adding a new resource...'`)
4. _Push_ (`git push origin my-new-resource`)
5. Create a new _Pull Request_ 