/* ******************************************************************
 * postgres client on the basis of sequelize
 ****************************************************************** */
import Sequelize from 'sequelize'
import config from '../config'
const { POSTGRES } = config

export default new Sequelize(
    POSTGRES.BASE,
    POSTGRES.USER,
    POSTGRES.PASS,
    {
        host: POSTGRES.HOST,
        dialect: 'postgres',
        logging: false,
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
    },
)
