import { Response } from 'express-serve-static-core';


export const handleError = (res: Response, err: any) => {
    res.status(401).json({ message: `Access Denied`});
}

export const handleNotFoundError = (res: Response, message: string) => {
    res.status(404).json({ message: `The flight you are looking for does not exsist!` });
}

export const handleUpdateError = (res: Response) => {
    res.status(500).json({ message: `An error occurred while updating the record` });
}

export const handlePassengerError = (res: Response, err: any) => {
    res.status(401).json({ message: `Access Denied`});
}

export const handlePassengerNotFound = (res: Response, err: any) => {
    res.status(404).json({ message: `The passenger you are looking for does not exsist!`});
}

export const handleUpdatePassenger = (res: Response, err: any) => {
    res.status(500).json({ message: `An error occurred while updating the record`});
}

export const handleDelayError = (res: Response, err: any) => {
    res.status(401).json({ message: `Access Denied`});
}

export const handleDelayNotFound = (res: Response, err: any) => {
    res.status(404).json({ message: `The passenger you are looking for does not exsist!`});
}

export const handleUpdateDelay = (res: Response, err: any) => {
    res.status(500).json({ message: `An error occurred while updating the record`});
}
