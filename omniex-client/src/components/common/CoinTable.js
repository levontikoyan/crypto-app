import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Loader from "./Loader";


const styles = theme => ({
  thead: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  tbody: {
    width: '100%',
    overflowX: 'auto',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 570
  },
  table: {
    minWidth: 700,
  },
  tableRow :{
    height: 70,
    cursor: 'pointer'
  }
});

class CoinTable extends Component {

  render() {
    const { classes, coins, isFavoritesTable, search, user } = this.props;
    let rows = [];
    rows = coins.data;

    if ( search !== '' && coins.data.length ) {
      const rgxp = new RegExp(search, 'i');
      rows = coins.data.filter((v) => v.name.match(rgxp) || v.symbol.match(rgxp))
    }

    if ( isFavoritesTable && coins.data.length ) {
      rows = coins.data.filter((v) => user.favorites.includes(v.website_slug));
    }


    return (
      <div>
        <Loader loading={this.props.coins.loading}>
          <Paper className={classes.thead}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Logo</TableCell>
                  <TableCell style={{ textAlign: 'center'}}>Name</TableCell>
                  <TableCell numeric>Marketcap</TableCell>
                  <TableCell numeric>Price</TableCell>
                  <TableCell numeric>Volume (24h)</TableCell>
                  <TableCell numeric>Change (24h)</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Paper>
          <Paper className={classes.tbody}>
            <Table style={{tableLayout: 'fixed'}} className={classes.table}>
              <TableBody>
                {rows.map(row => {
                  const { market_cap, volume_24h, price, percent_change_24h} = row.quotes.USD;
                  return (
                    <TableRow
                      hover={true}
                      key={row.id}
                      className={classes.tableRow}
                      onClick={ () => this.props.history.push(`/coin/${row.website_slug}`)}
                    >
                      <TableCell>
                        <Avatar src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${row.id}.png`} />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell numeric>${market_cap.toLocaleString()}</TableCell>
                      <TableCell numeric>${price.toLocaleString()}</TableCell>
                      <TableCell numeric>${volume_24h.toLocaleString()}</TableCell>
                      <TableCell numeric style={{ color: Math.sign(percent_change_24h) >= 1 ? '#009e73' : '#d94040'}}>{percent_change_24h}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Loader>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  coins: state.coins,
  user: state.user
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(CoinTable)));