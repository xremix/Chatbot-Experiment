# Idea for classifying the text

Category -> Question -> Context Question


# Idea for Context driven

1. Get Context
2. Get Answer
2.1. Clear context on final answer

### On each input store the current context

##### User A

Input: `Ich habe eine Frage zu einem Produkt`  
Context: `[productcategory]`

Input: `Es geht um Artikel PR123123`  
Context: `[productcategory, product]`

Input: `Ich würde gerne den Preis wissen`  
Context: `[productcategory, product, price]`

##### User B

Input: `Ich würde gerne den Preis von Artikel 123123 wissen`  
Context: `[productcategory, product, price]`


### Then have a graph with answers, from specific to generic

##### Product Category

```
if(productcategory) {
  if(product && price) {
    send("Das Produkt 1023213 kostet 123€")
    clearProductContext();
    send("Kann ich sonst weiterhelfen?")
  } else if(product && general) {
    send("Das Produkt ist ein Schraubenzieher. Schaue hier für mehr Informationen: http://link.xyz")
  } else if(product && availibility) {
    send("Das Produkt kann innerhalb von 2 Tagen geliefert werden. Es sind nur noch wenige Produkte verfügbar")
  } else if(product) {
    send("Was möchtest Du über das Produkt wissen? Ich kann Dir Informationen zu dem Preis, Lieferstatus oder allgemeine Informationen geben")
  } else {
    return "Um welches Produkt handelt es sich?"
  }
}
```


### This is how the context could look like for `User A`:

```
{
  product: 'PR123123',
  productcategory: true,
  product: true
}
```
