# Auto-Font-Size
A function that updates the font size within an element to match the size of that element. Mostly designed for &lt;div>
The functions listens for input, in the case of contentEditable=true, window resize and has a mutation observer for the box size.

See the autoFontSize.html file for the live example(requires autoFontSize.js file in the same folder)

Usage:

1.Include the js file:   <br>
```html 
<script src="autoFontSize.js"></script>
```
  
2.Get the desired element via any method:
```html
<script>
  const element = document.getElementById("div_id);   
</script>
```
  
3.call autoFontSize(); and pass it said element.
```html
<script>  
  
  const element = document.getElementById("div_id);  
    
  autoFontSize(element);  
  
</script>
```
  
4.done!

