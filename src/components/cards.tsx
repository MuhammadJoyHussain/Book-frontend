import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react'
import { IBook } from '../types/globaltypes'
import { Link } from 'react-router-dom'

interface CardProps {
  books: IBook[]
}

export function Cards({ books }: CardProps) {
  return (
    <div className='grid grid-cols-3 gap-20'>
      {books?.map((b) => (
        <Card key={b._id} className='mt-6 w-80'>
          <CardBody>
            <Typography variant='h6' color='blue-gray' className='mb-2'>
              Book Title: {b.title}
            </Typography>
            <Typography>Author Name: {b.publisher.name}</Typography>
            <Typography>Genre: {b.genre}</Typography>
            <Typography>Publication Date: {b.publicationYear}</Typography>
          </CardBody>
          <CardFooter className='pt-0'>
            <Link to={`/books/${b._id}`} relative='path'>
              <Button>Read More</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
