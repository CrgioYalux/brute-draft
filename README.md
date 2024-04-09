# Brute (placeholder)
Atomically-defined, molecularly-linked, logic first components

## Philosophy
- There's atomic components and molecular components.
  The former are used as building blocks for defining the latter.
- As a component's atomicity increases, its use cases also increases.
  - The range of scenarios in which you can apply that component is wider.
  - This has a direct impact on the amount of properties and generics these components receive
    as they are expected to be used in the creation of the molecule components.

## Components currently working on
- [Grid](#grid)
  - [How I want to use it](#how-i-want-to-use-it)

## Components done
- CheckboxList
- PasswordInput
- TextInput
- TextArea
- DatePicker
- TimePicker
- DateTimePicker
- Switcher
- GenericRadioInputList

## Components which are not done but are pretty defined already

## Components that should be re-visited
- CheckboxList
  - Since `<GenericRadioInputList>` implementation, there's things I'd like to also implement in
    the `<CheckboxList>` component starting by allowing a full-generic use instead of forcing the user
    to extend their types to implement the MinimumItemProps type.
- Switcher 
  - Given that the `<GenericRadioInputList>` component's implementation offers a wider API that feels
  like a superset of what the `<Switcher>` component allows, maybe the former could be defined using the latter,
  enforcing, this way, the philosophy of libray.

## Components that lack an actual use case
- Grid (sadly)

---

## Concepts

### Grid

#### How I want to use it

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

#### Some notes
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
- There's Internal and External versions for the Row and Cell components
  - The External is provided to the user to define the visual structure
  - Each parent (Grid and Row) takes its children, passed in their External version, maps them to extract the passed props into a list state, and finally renders their equivalent using the Internal version.
  I.E.
  ```jsx
    // the user describes
    <Grid>
      <Row>
        <Cell isleId={1}>A</Cell>
        <Cell isleId={2}>B</Cell>
      </Row>
      <Row>
        <Cell isleId={1}>A</Cell>
        <Cell isleId={3}>D</Cell>
      </Row>
    </Grid>
    // and what ends up rendering is
    <Grid>
      <InternalRow id={0}>
        <InternalCell id={0} isleId={1}>A</InternalCell>
        <InternalCell id={1} isleId={2}>B</InternalCell>
      </InternalRow>
      <InternalRow id={1}>
        <InternalCell id={0} isleId={3}>A</InternalCell>
        <InternalCell id={1} isleId={3}>D</InternalCell>
      </InternalRow>
    </Grid>
    // and are the Internal versions the ones actually handling logic
  ```
  - Maybe this component could implement a way of declaratively defining a grid, but that at the end gets
  rendered as a list of cells which are siblings; no hierarchy, like when using InteralRow.
    - And maybe the whole point of the component could be that it generates the css for showing that
    list of siblings-cells as the declaratevely-defined grid.
    - This could allow to do interesintg animations that, by other way, I wouldn't know how to do,
    nor I know if they would be feasible; e.g. displace and rotate isles, and do it smoothly-animated

--- 

## TODO
- [ ] Re-think all components defined up to date following the library philosophy.
