import { FC } from 'react';
import { Box, Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type EdgeCase = {
    title: string,
    explanation: string;
}

const conorprops: { edgecases: EdgeCase[] } = {
    edgecases: [
        {
            title: 'What if the ID is expired?',
            explanation: 'Ask the user to provide an updated document.',
        },
        {
            title: 'What if the name on the ID does not match?',
            explanation: 'If the name is similar you can ignore the difference. Otherwise request a new ID or a name change doc.',
        },
    ],
};

const EdgeCases: FC = () => {
    return (
        <Box>
            {conorprops.edgecases.map((edgecase, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography>{edgecase.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{edgecase.explanation}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}

export default EdgeCases