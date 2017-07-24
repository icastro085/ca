import React from 'react';

/**
 * @class SearchNav
 */
export default class SearchNav extends React.Component {
  /**
   * @method constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    let {
      totalItems,
      itemsByPage,
    } = this.props;

    this.state = {
      numberOfPage: Math.ceil(totalItems/itemsByPage),
    };
  }

  /**
   * @method render
   * @return {Object}
   */
  render() {
    let {
      totalItems,
      itemsByPage,
      page,
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

  /**
   * @method onChangePage
   * @param {Number} page
   */
  onChangePage(page) {
    let {onChangePage} = this.props;
    if (typeof onChangePage === 'function') {
      onChangePage(page);
    }
  }

  /**
   * @method next
   */
  next() {
    let {page} = this.props;
    let {numberOfPage} = this.state;
    page++;
    if (page < numberOfPage) {
      this.onChangePage(page);
    }
  }

  /**
   * @method prev
   */
  prev() {
    let {page} = this.props;
    page--;
    if (page >= 0) {
      this.onChangePage(page);
    }
  }
}
