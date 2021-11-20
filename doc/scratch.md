

```jsx

const timezones = async (query: string) => {};

    // useSearchableOptions timezones is an async function with search
    <SearchableChoose
    
        provider={timezones}
        extractor={...}

        render...
        render...
        render...

        className...

    />

    // useOptions timezones is a promise
    <Choose

        provider={timezones}
        extractor={}
    
        render...
        render...
        render...

        className...

    />

```
