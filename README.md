# Open-Smart-Fit

This library was created in order to retrieve information about Smart Fit gyms.

## What is?

A package listing all the "Smart Fit" gyms retrieved from the [smartfit.com.br website](https://www.smartfit.com.br/). This app works correctly with the website version obtained on 2022-04-04.

## Installation (Not yet)

Install the package from the [npmjs.com](npmjs.com) repository.

```shell
npm i @andsfonseca/open-smart-fit
```

## Usage

### Importation

To perform the import via Javascript:

```js
var Gyms = require('@andsfonseca/open-smart-fit').Gyms;
```

To perform the import via Typescript:

```ts
import { Gyms } from '@andsfonseca/open-smart-fit'
```

### Functions

* #### getRawData ()

Retrieves Smartfit JSON with a list of Gym locations including their general information.

Returns a list of gyms in the standard format of Smartfit.com.br [ILocation](#ilocation).

```ts
let locations: ILocations[] = await Gyms.getRawData()
```

### Interfaces

* ### Smart Fit Json Models

    These are the interfaces generated from the JSON retrieved from the [smartfit.com.br website](https://www.smartfit.com.br/).

    * ### IPagination

    Gym search page information.

    ```ts
    interface IPagination {
        locations: ILocation[]
        locations_count: number
        next_page?: number
        view_type: string
    }
    ```

    |    Property      |                           Description                             |
    |:----------------:|:-----------------------------------------------------------------:|
    | locations        | Array with the information about the gyms. (Usually 8 per page)   | 
    | locations_count  | Number of gyms.                                                   |
    | next_page        | Next page number.                                                 |
    | view_type        | Type of visualization used in the front-end of the website.       |

    * ### IPrice

    Gym plan pricing information.

    ```ts
    interface IPrice {
        integer: number,
        decimal: string,
        value: number,
        original_price: string
    }
    ```

    |    Property     |           Description               |
    |:---------------:|:-----------------------------------:|
    | integer         | Monthly fee in integer.             | 
    | decimal         | Monthly fee in decimal.             |
    | value           | Monthly fee.                        |
    | original_price  | Original monthly fee in Real. (R$)  |

    * ### IAddress

    Address information.

    ```ts
    interface IAddress {
        first_line: string,
        second_line: string,
        position: ICoordinates
    }
    ```

    |    Property     |                           Description                        |
    |:---------------:|:------------------------------------------------------------:|
    | first_line      | First line of the address (Street, number and neighborhood). | 
    | second_line     | Second line of address (City, state, zip code).              |
    | position        | Geographic coordinates.                                      |

    * ### ICoordinates

    Geographic coordinate information.

    ```ts
    interface ICoordinates {
        latitude: string,
        longitude: string
    }
    ```

    |    Property     |  Description  |
    |:---------------:|:-------------:|
    | latitude        | Latitude.     | 
    | longitude       | Longitude.    |

    * ### IFacility

    Resources available at the academy.

    ```ts
    interface IFacility {
        id: number,
        name: string,
        description: string,
        icon_svg_slug: string
    }
    ```

    |    Property      |        Description        |
    |:----------------:|:-------------------------:|
    | id               | Resource identifier.      | 
    | name             | Resource name.            |
    | description      | Feature description.      |
    | icon_svg_slug    | Resource icon identifier. |

    * ### ILocationPicture

    Information from the images of a particular gym

    ```ts
    interface ILocationPicture {
        id: number
        location_id: number
        caption: string
        image_url: string
        smart_system_id: number
        created_at: string
        updated_at: string
        current_shard: string
    }
    ```

    |    Property      |        Description       |
    |:----------------:|:------------------------:|
    | id               | Image identifier.        | 
    | location_id      | Academy identifier.      |
    | caption          | Image subtitle.          |
    | image_url        | image URL.               |
    | smart_system_id  | Smart System Identifier. |
    | created_at       | Creation date.           |
    | updated_at       | Update date.             |
    | current_shard    | fragment information.    |

## Data Cleaning

To ignore unnecessary and useless information, attributes are rearranged to a more appropriate format, including more convenient information.

Each information is represented as general or additional. General information is always retrieved and additional information only if the user requests it externally.

|       Property    |    Type            |    Implemented            |
|:--------------------:|:-------------------------:|:-----------:|
| id                 | general       | ✅ Yes.       | 
| price                 | general       | ✅ Yes.       | 
| address                 | general       | ✅ Yes.       | 
| facilities                 | general       | ✅ Yes.       | 
| cnpj                 | additional       | ✅ Yes.       | 
| imagesUri                 | additional       | ✅ Yes.       | 

## Issues

Feel free to submit issues and enhancement requests.

## Contribution

1. Fork the project
2. Create a _branch_ for your modification (`git checkout -b my-new-resource`)
3. Do the _commit_ (`git commit -am 'Adding a new resource...'`)
4. _Push_ (`git push origin my-new-resource`)
5. Create a new _Pull Request_ 