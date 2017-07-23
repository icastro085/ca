import React from 'react';
import ReactDom from 'react-dom';

export default class SearchNav extends React.Component {

  constructor(props) {
    super(props);
    let {
      totalItems,
      itemsByPage,
    } = this.props;

    this.state = {
      numberOfPage: Math.ceil(totalItems/itemsByPage)
    };
  }

  render () {
    let {
      totalItems,
      itemsByPage,
      page
    } = this.props;

    if (totalItems <= itemsByPage) {
      return null;
    }

    let {numberOfPage} = this.state;
    let pages = [];

    for (let i=0; i<numberOfPage; i++) {
      let active = i == page ? 'active' : '';
      pages.push(
        <li className={active} key={i} onClick={() => this.onChangePage(i)}>
          <a href="#">{i + 1}</a>
        </li>
      );
    }

    return (
      <article className="text-center">
        <nav>
          <ul className="pagination pagination-lg">
            <li onClick={() => this.prev()}>
              <a href="#">
              <span>&laquo;</span>
              </a>
            </li>
            {pages}
            <li onClick={() => this.next()}>
              <a href="#">
              <span>&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </article>
    );
  }

  onChangePage(page) {
    let {onChangePage} = this.props;
    if (typeof onChangePage === 'function') {
      onChangePage(page);
    }
  }

  next() {
    let {page} = this.props;
    let {numberOfPage} = this.state;
    page++;
    if (page < numberOfPage) {
      this.onChangePage(page);
    }
  }

  prev() {
    let {page} = this.props;
    let {numberOfPage} = this.state;
    page--;
    if (page >= 0) {
      this.onChangePage(page);
    }
  }
}
