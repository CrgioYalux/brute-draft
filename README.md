### How I would like to use this:

```react
<Grid>
  <Row>
    <Cell id='#0'></Cell>
    <Cell id='#1'>generic</Cell>
    <Cell id='#2' span={2}>this takes double space</Cell>
  </Row>
  <Row>
    <Cell id='#0'></Cell> // a cell takes 1x1 by default
    <Cell id='#1' addapt></Cell> // an addapt cell takes all of the left space
  </Row>
</Grid>
```

### TODO: 

1. Is there a way of finding out how many children a component has?
  - Yes. I can use a context provider (<Grid />) and each time I render 
  a <Row /> or an <Item /> component inside its context they *subscribe*
  to it, notifiying the parent component that the content has changed.
  That way I can, e.g., have a cols and rows state that later I could use
  to addapt the css
2. Do I need IDs for the Cells? 
  - Maybe if I want to match behaviors to affect all of those who 
  shared the same ID, or to join cells
3. Each row can have its own context to keep track of how many Cells it has.
4. Cells comunicate with Rows and Rows comunicate with the Grid. In that order.
5. Maybe can later change the names of the components for Archipelago and Isle
but I need to find one for the rows
6. Maybe use the `#${number}` ids as a way of keeping track of the position
7. Row gets from grid its identifier as a row which can then be used in each
CellT as the `x` position value.
8. Instead of using array states use map for uniqueness
9. I would like to find a way to implicity add the ids and only require the user
to add the isleIds since the ids are always going to be different and just the later
is the one going to change.
  - Maybe just use a counter state inside of Row for counting Cells and just assign
  the current state to the current adding cell. (1)
  - !!! The thing if I want the Id to represent anything else aside from a mere identificator,
  e.g. a positioner (although that can be done simply by taking wherever the user chooses to
  render the component - I think I'm going to do this instead, but think of other reasons a manual
  Id would be necessary).
10. (1) I can do the same with the Grid, having a counter state within for keeping
track of the rows being added
