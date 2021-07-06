import React from 'react';

const CHANGE_PAGE = 'CHANGE_PAGE';
const CHANGE_ROWS = 'CHANGE_ROWS';
const CHANGE_SORT = 'CHANGE_SORT';
const CHANGE_SEARCHTEXT = 'CHANGE_SEARCHTEXT';
const CHANGE_SEARCHFIELD = 'CHANGE_SEARCHFIELD';
const CHANGE_SEARCHFIELDFACET = 'CHANGE_SEARCHFIELDFACET';
const CHANGE_SEARCHFILTER = 'CHANGE_SEARCHFILTER';
const CHANGE_SEARCHFILTERFACET = 'CHANGE_SEARCHFILTERFACET';
const CHANGE_PARENT_COLLECTION = 'CHANGE_PARENT_COLLECTION';
const CHANGE_FACET = 'CHANGE_FACET';
const CHANGE_ITEMSEARCHDOCUMENT = 'CHANGE_ITEMSEARCHDOCUMENT';
const CHANGE_QUERYPARAMS = 'CHANGE_QUERYPARAMS';
const CHANGE_MATRIXPARAMS = 'CHANGE_MATRIXPARAMS';
const CHANGE_SUGGESTION = 'CHANGE_SUGGESTION';

const ACTION_TYPE = {
  CHANGE_PAGE,
  CHANGE_ROWS,
  CHANGE_SORT,
  CHANGE_SEARCHTEXT,
  CHANGE_SEARCHFIELD,
  CHANGE_SEARCHFIELDFACET,
  CHANGE_SEARCHFILTER,
  CHANGE_SEARCHFILTERFACET,
  CHANGE_PARENT_COLLECTION,
  CHANGE_FACET,
  CHANGE_ITEMSEARCHDOCUMENT,
  CHANGE_QUERYPARAMS,
  CHANGE_MATRIXPARAMS,
  CHANGE_SUGGESTION,
};

const setInitialDefaultState = ({
  queryParams = {},
  itemSearchDocument = {},
  rowsPerPage = 10,
  page = 0,
  ...state
} = {}) => ({
  ...state,
  queryParams: {
    content: 'metadata',
    interval: 'generic',
    first: page * rowsPerPage + 1,
    number: rowsPerPage,
    ...queryParams,
  },
  itemSearchDocument: {
    intervals: 'generic',
    filter: [],
    ...itemSearchDocument,
  },
  rowsPerPage,
  page,
});

const searchReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.CHANGE_ITEMSEARCHDOCUMENT: {
      return {
        ...state,
        itemSearchDocument: action.itemSearchDocument,
      };
    }
    case ACTION_TYPE.CHANGE_QUERYPARAMS: {
      return {
        ...state,
        queryParams: action.queryParams,
      };
    }
    case ACTION_TYPE.CHANGE_PAGE: {
      return {
        ...state,
        page: action.page,
        queryParams: {
          ...state.queryParams,
          first: action.page * state.rowsPerPage + 1,
        },
      };
    }
    case ACTION_TYPE.CHANGE_ROWS: {
      return {
        ...state,
        rowsPerPage: action.rowsPerPage,
        page: 0,
        queryParams: {
          ...state.queryParams,
          first: 1,
          number: action.rowsPerPage,
        },
      };
    }
    case ACTION_TYPE.CHANGE_SORT: {
      return {
        ...state,
        page: 0,
        searchText: action.value,
        sort: action.value,
        itemSearchDocument: {
          ...state.itemSearchDocument,
          sort: action.field
            ? [
                {
                  field: action.field,
                  order: action.order || 'descending',
                },
              ]
            : [],
        },
        queryParams: {
          ...state.queryParams,
          first: 1,
        },
      };
    }
    case ACTION_TYPE.CHANGE_SEARCHTEXT: {
      return {
        ...state,
        page: 0,
        searchText: action.value,
        itemSearchDocument: action.value
          ? {
              ...state.itemSearchDocument,
              text: [{ value: `${action.value}` }],
            }
          : {
              ...state.itemSearchDocument,
              text: [],
            },
        queryParams: {
          ...state.queryParams,
          first: 1,
        },
      };
    }
    case ACTION_TYPE.CHANGE_SEARCHFIELD: {
      return {
        ...state,
        page: 0,
        field: action.field,
        itemSearchDocument: action.field
          ? {
              ...state.itemSearchDocument,
              field: action.field,
            }
          : {
              ...state.itemSearchDocument,
              field: [],
            },
        queryParams: {
          ...state.queryParams,
          first: 1,
        },
      };
    }
    case ACTION_TYPE.CHANGE_SEARCHFIELDFACET: {
      return {
        ...state,
        page: 0,
        field: action.field,
        facet: action.facet,
        itemSearchDocument: action.field
          ? {
              ...state.itemSearchDocument,
              field: action.field,
              facet: action.facet,
            }
          : {
              ...state.itemSearchDocument,
              field: [],
              facet: [],
            },
        queryParams: {
          ...state.queryParams,
          first: 1,
        },
      };
    }
    case ACTION_TYPE.CHANGE_SEARCHFILTER: {
      return {
        ...state,
        page: 0,
        filter: action.filter,
        itemSearchDocument: action.filter
          ? {
              ...state.itemSearchDocument,
              filter: action.filter,
            }
          : {
              ...state.itemSearchDocument,
              filter: [],
            },
        queryParams: {
          ...state.queryParams,
          first: 1,
        },
      };
    }
    case ACTION_TYPE.CHANGE_SEARCHFILTERFACET: {
      return {
        ...state,
        page: 0,
        filter: action.filter,
        itemSearchDocument: action.filter
          ? {
              ...state.itemSearchDocument,
              filter: action.filter,
              facet: action.facet,
            }
          : {
              ...state.itemSearchDocument,
              filter: [],
              facet: [],
            },
        queryParams: {
          ...state.queryParams,
          first: 1,
        },
      };
    }
    case ACTION_TYPE.CHANGE_FACET: {
      return {
        ...state,
        page: 0,
        facet: action.facet,
        itemSearchDocument: action.facet
          ? {
              ...state.itemSearchDocument,
              facet: action.facet,
            }
          : {
              ...state.itemSearchDocument,
              facet: [],
            },
        queryParams: {
          ...state.queryParams,
          first: 1,
        },
      };
    }
    case ACTION_TYPE.CHANGE_PARENT_COLLECTION: {
      return {
        ...state,
        page: 0,
        parentCollection: action.value,
        itemSearchDocument: action.value
          ? {
              ...state.itemSearchDocument,
              operator: {
                field: [
                  { name: '__parent_collection', value: [{ value: `${action.value}` }] },
                  { name: '__collection', value: [{ value: `${action.value}` }] },
                ],
                operation: 'OR',
              },
            }
          : {
              ...state.itemSearchDocument,
              operator: undefined,
            },
        queryParams: {
          ...state.queryParams,
          first: 1,
        },
      };
    }
    case ACTION_TYPE.CHANGE_SUGGESTION: {
      return {
        ...state,
        itemSearchDocument: {
          ...state.itemSearchDocument,
          suggestion: action.suggestion,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default function useSearch(initialState) {
  const initialDefaultState = setInitialDefaultState(initialState);
  const [state, dispatch] = React.useReducer(searchReducer, initialDefaultState);

  const onChangeRowsPerPage = ({ target: { value: newRows } } = {}) =>
    dispatch({
      type: ACTION_TYPE.CHANGE_ROWS,
      rowsPerPage: newRows,
    });

  const onChangePage = ({ page: newPage }) =>
    dispatch({
      type: ACTION_TYPE.CHANGE_PAGE,
      page: newPage,
    });

  const onChangeSort = (event, field, order) =>
    dispatch({
      type: ACTION_TYPE.CHANGE_SORT,
      field,
      order,
    });

  const setSearchText = React.useCallback(
    (value) =>
      dispatch({
        type: ACTION_TYPE.CHANGE_SEARCHTEXT,
        value,
      }),
    [],
  );

  const setItemSearchDocument = React.useCallback(
    (itemSearchDocument) =>
      dispatch({
        type: ACTION_TYPE.CHANGE_ITEMSEARCHDOCUMENT,
        itemSearchDocument,
      }),
    [],
  );

  const setQueryParams = React.useCallback(
    (queryParams) =>
      dispatch({
        type: ACTION_TYPE.CHANGE_ITEMQUERYPARAMS,
        queryParams,
      }),
    [],
  );

  const setSearchField = React.useCallback(
    (field) =>
      dispatch({
        type: ACTION_TYPE.CHANGE_SEARCHFIELD,
        field,
      }),
    [],
  );

  const setSearchFieldFacet = React.useCallback((field) => {
    const facet = field.map(({ name }) => ({ field: name, count: true }));
    dispatch({ type: ACTION_TYPE.CHANGE_SEARCHFIELDFACET, field, facet });
  }, []);

  const setSearchFilter = React.useCallback(
    (filter) =>
      dispatch({
        type: ACTION_TYPE.CHANGE_SEARCHFILTER,
        filter,
      }),
    [],
  );

  const setSearchFilterFacet = React.useCallback(
    (filter) => {
      const fieldList = filter.reduce((a, { field = [] }) => a.concat(field), []);
      const facet = fieldList.map(({ name }) => ({
        name,
        field: name,
        count: true,
        exclude: [name],
      }));
      dispatch({ type: ACTION_TYPE.CHANGE_SEARCHFILTERFACET, filter, facet });
    },
    [dispatch],
  );

  const setFacet = React.useCallback(
    (facet) => {
      dispatch({ type: ACTION_TYPE.CHANGE_FACET, facet });
    },
    [dispatch],
  );

  const setParentCollection = React.useCallback(
    (value) =>
      dispatch({
        type: ACTION_TYPE.CHANGE_PARENT_COLLECTION,
        value,
      }),
    [],
  );

  const setSuggestion = React.useCallback((suggestion) => {
    dispatch({ type: ACTION_TYPE.CHANGE_SUGGESTION, suggestion });
  }, []);

  return {
    state,
    onChangeRowsPerPage,
    onChangePage,
    onChangeSort,
    setSearchText,
    setSearchField,
    setSearchFieldFacet,
    setSearchFilter,
    setSearchFilterFacet,
    setFacet,
    setItemSearchDocument,
    setQueryParams,
    setParentCollection,
    setSuggestion,
  };
}
