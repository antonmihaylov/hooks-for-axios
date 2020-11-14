# hooks-for-axios

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->
## About The Project

Simple react hooks for Axios built using Typescript.
Features:
- Manual cancellation
- Cancellation on every new request
- Cancellation when the component is unmounted
- Eager loading when the component mounts
- Flexible Axios configuration - optionally pass in a custom Axios instance, default request configuration and per-request configuration
- Request debouncing - excutes the request only after a certain period of time where the execution hasn't been called - useful for real-time search, where you want to make the request only after the user stops typing

Available as an NPM package `hooks-for-axios`
https://www.npmjs.com/package/hooks-for-axios

### Built With
* [Typescript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [React-hook debounce](@react-hook/debounce)
* [Axios](https://github.com/axios/axios)



## Getting Started

### Prerequisites

React and Axios are not included in the package. They are peer dependencies and you need to have them in your project in one way or another.

Note: React version has to be >=16.8, since that's when hooks were introduced.

```sh
npm install react axios
```
or
```sh
yarn add react axios
```

### Installation

Either clone the repo in your project or use a package manager:
```sh
npm install hooks-for-axios
```
or
```sh
yarn add hooks-for-axios
```

<!-- USAGE EXAMPLES -->
## Usage


1. Import the hook/s in your project
```js
import {useAxios, useAxiosDebounced} from hooks-for-axios;
```

2. Call useAxios in your functional component. It takes in an configuration object {UseAxiosConfig} with the following properties (all are optional and default to undefined/falsy):
- `axiosInstance {AxiosInstance}` - Provide a custom axios instance. If not set, the default Axios instance will be used
- `cancelLastRequestOnExecute {boolean}` - If this is true, if there is an unfinished request when you call execute, it will get cancelled
- `defaultAxiosConfig {AxiosRequestConfig}` - This is the object that gets passed to the Axios() function, aka the request config. Set this if you want any default axios configuration to be applied for every request.  Any config passed to the execute() function  will get merged with this one, with the execute config overriding duplicate values from this one.
    - `loadEagerly: {boolean}` - Set this to true to fetch a request right after rendering for the first time. Note: you need to define defaultAxiosConfig if you're going to use this.
3. You get back an object with the following properties and functions:
- `execute` - call this function as if you're calling axios(). Either pass the url an optional configuration `execute(url, requestConfig)` or pass the configuration only `execute(requestConfig)`. Any configuration you pass in will get merged with the default axios configuration you passed to the useAxios function. If there are duplicates - the execute configuration will override the default one. Returns a promise that will eventually resolve with the data or get rejected with an error or a cancellation.
- `isLoading` - This gets changed every time the request state changes. If there is a request going on currently it is true.
- `error` - This gets set when there is an error with the request. (cancelling does not affect it). Note that any errors (including cancellations) will still get thrown, so you can catch them from the promise returned from `execute()`. The error field gets reset on every request.
- `cancel` - call this to cancel the last ongoing request, if any
- `data` - this is the data you receive from axios (i.e. axiosResponse.data)

Examples:
```js
const appAxios = Axios.create();
  ...
const MyComponent = () => {
    const {execute, isLoading, error, cancel, data} = useAxios({
        axiosInstance: appAxios,
        cancelLastRequestOnExecute: false,
        loadEagerly: true,
        defaultAxiosConfig: {
            method: "GET",
            url: serverApiUrl,
        }
    });
    
    if (isLoading)
        return <Spinner/>

    if (error)
        return <div className="error">{error.message}</div>

    return <div>{data}</div>
}
```


```js
const MyComponent = () => {
    const {execute, isLoading, error, cancel, data} = useAxios();

    if (isLoading)
        return <Spinner/>

    if (error)
        return <div className="error">{error.message}</div>

    if(data)
        return <div>{data}</div>

    return <div>
        <button onClick={() => execute({url: "my-backend-api.io/api/load", method: "GET"})}>Load data</button>
        <button onClick={() => execute({url:  "my-backend-api.io/api/save", method: "POST"})}>Save data</button>
      </div>
    
}
```

4. To use the debouncing feature:
```js
import {useAxiosDebounced} from "hooks-for-axios";
```

useAxiosDebounced takes 2 parameters:
- wait {number} - the amount of ms to wait after making the last executeDebounced() call before sending the request
- config {UseAxiosConfig} - the same configuration as useAxios()

You get back the same set of parameters and functions as useAxios, except now you have another function:
`executeDebounced`. It takes in the same set of arguments as execute(), except that it doesn't return a promise (because not every executeDebounced is executed actualy).
Only after you stop calling executeDebounced, after the wait period it will get executed. You still have access to execute if you need immediate execution.

Example:
```js
   const {executeDebounced, isLoading, error, cancel, data} = useAxiosDebounced(200, {
        cancelLastRequestOnExecute: true
    });


    return (
        <div>
            <input onChange={e => executeDebounced("my-backend-api.io/api/search&query=" + e.target.value)}
                   type="search" placeholder="Search"/>
            <ul>{data && data.map(d => <li>{d.name}</li>)}</ul>
        </div>
    );
```

The debouncing functionality is provided by [React-hook debounce](@react-hook/debounce). This just integrates it to use with axios and the useAxios hook.
