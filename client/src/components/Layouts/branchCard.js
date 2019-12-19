import React from "react"
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia
} from "@material-ui/core"
import { YellowButton } from "../utilities/styledComponents"
import { DeleteButton } from "../utilities/FieldComponets"

class RenderCard extends React.Component {
  render() {
    const { deleteMethod, branch } = this.props
    console.log(branch)
    return (
      <Card maxWidth="350">
        <CardActionArea href={`/branches/${branch._id6}`}>
          <CardMedia
            image={branch.image}
            title={branch.name}
            component="img"
            height="170"
          />
          <CardContent>
            <Typography
              color="primary"
              gutterBottom
              variant="h5"
              component="h2"
            >
              {branch.name}
            </Typography>
            <Typography color="primary" variant="body2" component="p">
              {branch.address}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <YellowButton size="small" href={`/branches/edit/${branch._id}`}>
            Edit
          </YellowButton>
          <DeleteButton
            size="small"
            onClickMethod={() => {
              deleteMethod(branch._id)
            }}
          >
            Learn More
          </DeleteButton>
        </CardActions>
      </Card>
    )
  }
}

export default RenderCard
