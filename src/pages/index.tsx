import * as React from "react"
import { Provider } from 'react-redux';
import { store } from '../store';
import type { HeadFC, PageProps } from "gatsby"
import '../styles/styles.scss'
import {Filter, Header, TicketList} from "../components";
import {useState} from "react";


const IndexPage: React.FC<PageProps> = () => {
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('cheapest');

  return (
      <Provider store={store}>
        <main>
            <Header/>
            <div className='container'>
                <Filter filter={filter} setFilter={setFilter} />
                <TicketList filter={filter} sort={sort} setSort={setSort} />
            </div>
        </main>
      </Provider>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
