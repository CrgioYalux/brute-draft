# Brute

## Components currently working on
- [Grid](#grid)
  - [How I'd like to use it](#how-i'd-like-to-use-it)

## Components done
- TextInput
- PasswordInput
- CheckboxList

## Components which are not done but are pretty defined already
- TextArea
- DateTimeInput
- DateInput
- TimeInput
- CurrencyInput

---

# Concepts

## Grid

### How I'd like to use it

```react
<Grid>
  <Row>
    <Cell isleID={1}></Cell>
    <Cell isleID={1}>generic</Cell>
    <Cell span={2}>this takes double space</Cell>
  </Row>
  <Row>
    <Cell></Cell> // a cell takes 1x1 by default
    <Cell addapt></Cell> // an addapt cell takes all of the left space
  </Row>
</Grid>
```

### TODO
- Cells should have unique IDs provided by the Row component
- Rows should have unique IDs provided by the Grid component
- IDs in Cells and Rows can also work for positioning
- Cells comunicate with Rows and Rows comunicate with the Grid
- Each parent component could provide a context for its children
- Cells can have an `isleID` prop that links them both logically and visually
  - Logically by subcribing to the same providers and executing the same calls
  - Visually by joining them
  - Both basically working as one
- Cells IDs and Rows IDs are useful
- Parent receives its children and modifies them before rendering adding their identifiable props
  - For this use the [Children API](https://react.dev/reference/react/Children)
  - [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect) could be useful too
