import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {
  console.log(props.store)

  // const filterClicked = (value) => {
  //   props.store.dispatch(filterChange(value))
  // }

  return (
    <div>
        all   <input
          type="radio" 
          name="filter" 
          onChange={() => props.filterClicked('ALL')} />
        important   <input 
          type="radio" 
          name="filter" 
          onChange={() => props.filterClicked('IMPORTANT')} />
        not important   <input 
          type="radio" 
          name="filter" 
          onChange={() => props.filterClicked('NOT IMPORTANT')} />
    </div>
  ) 
}

const mapDispatchToProps = dispatch => {
  return {
    filterClicked: value => {
      dispatch(filterChange(value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(VisibilityFilter)
