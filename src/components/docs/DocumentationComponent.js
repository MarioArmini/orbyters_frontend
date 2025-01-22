import React, { useState } from 'react';
import {
    Container,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
    Typography,
    Box,
    Paper,
    useTheme,
} from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { DocsTemplate } from './DocsTemplates';

export const Documentation = ({ t }) => {

    if (!DocsTemplate || !Object.keys(DocsTemplate).length) {
        return <div>No Documentation Available</div>;
    }

    const [selectedSection, setSelectedSection] = useState(Object.keys(DocsTemplate)[0]);
    const [selectedSubsection, setSelectedSubsection] = useState(Object.keys(DocsTemplate[selectedSection])[0]);
    const theme = useTheme();

    const renderContent = () => {
        const content = DocsTemplate[selectedSection][selectedSubsection];

        if (content.includes('\n')) {
            return (
                <SyntaxHighlighter
                    language="javascript"
                    style={materialDark}
                    showLineNumbers
                    wrapLines
                >
                    {content.trim()}
                </SyntaxHighlighter>
            );
        }

        return <Typography>{content}</Typography>;
    };

    return (
        <Container
            maxWidth="xl"
            sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', mt: 5 }}
        >
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Box sx={{ overflow: 'auto' }}>
                    {Object.keys(DocsTemplate).map((section) => (
                        <React.Fragment key={section}>
                            <Typography variant="h6" sx={{ padding: 2 }}>
                                {section}
                            </Typography>
                            <List>
                                {Object.keys(DocsTemplate[section]).map((subsection) => (
                                    <ListItem
                                        key={subsection}
                                        disablePadding
                                        onClick={() => {
                                            setSelectedSection(section);
                                            setSelectedSubsection(subsection);
                                        }}
                                    >
                                        <ListItemButton selected={selectedSubsection === subsection}>
                                            <ListItemText primary={subsection} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                        </React.Fragment>
                    ))}
                </Box>
            </Drawer>

            {/* Main Content */}
            <Container
                sx={{
                    flexGrow: 1,
                    padding: 4,
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    {selectedSubsection}
                </Typography>
                <Paper sx={{ padding: 2 }}>
                    {renderContent()}
                </Paper>
            </Container>
        </Container>
    );
};
