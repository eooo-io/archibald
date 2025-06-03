import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Textarea,
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { MdAdd, MdDownload, MdUpload } from 'react-icons/md';
import type { Edge, Node } from 'reactflow';
import type { CloudDesign, CloudDesignMetadata } from '../types/CloudDesign';
import { STORAGE_KEYS } from '../types/CloudDesign';

interface DesignManagerProps {
  nodes: Node[];
  edges: Edge[];
  onLoadDesign: (design: CloudDesign) => void;
  currentDesignId?: string;
}

export const DesignManager = ({ nodes, edges, onLoadDesign, currentDesignId }: DesignManagerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [designs, setDesigns] = useState<CloudDesignMetadata[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<string>('');
  const [newDesignName, setNewDesignName] = useState('');
  const [newDesignDescription, setNewDesignDescription] = useState('');
  const toast = useToast();

  // Load designs list on mount
  useEffect(() => {
    const savedDesigns = localStorage.getItem(STORAGE_KEYS.DESIGNS_LIST);
    if (savedDesigns) {
      setDesigns(JSON.parse(savedDesigns));
    }
  }, []);

  // Save new design
  const saveNewDesign = useCallback(() => {
    if (!newDesignName.trim()) {
      toast({
        title: 'Design name required',
        status: 'error',
        duration: 2000,
      });
      return;
    }

    const newDesign: CloudDesign = {
      id: crypto.randomUUID(),
      name: newDesignName,
      description: newDesignDescription,
      nodes,
      edges,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    };

    // Save design data
    localStorage.setItem(
      `${STORAGE_KEYS.DESIGN_PREFIX}${newDesign.id}`,
      JSON.stringify(newDesign)
    );

    // Update designs list
    const updatedDesigns = [...designs, {
      id: newDesign.id,
      name: newDesign.name,
      description: newDesign.description,
      createdAt: newDesign.createdAt,
      updatedAt: newDesign.updatedAt,
      currentVersion: newDesign.version,
    }];
    localStorage.setItem(STORAGE_KEYS.DESIGNS_LIST, JSON.stringify(updatedDesigns));
    setDesigns(updatedDesigns);

    // Save initial version
    localStorage.setItem(
      `${STORAGE_KEYS.VERSION_PREFIX}${newDesign.id}-1`,
      JSON.stringify({
        version: 1,
        nodes: newDesign.nodes,
        edges: newDesign.edges,
        timestamp: newDesign.createdAt,
        description: 'Initial version',
      })
    );

    toast({
      title: 'Design saved',
      description: `"${newDesign.name}" has been saved.`,
      status: 'success',
      duration: 2000,
    });

    setNewDesignName('');
    setNewDesignDescription('');
    onClose();
  }, [newDesignName, newDesignDescription, nodes, edges, designs, toast, onClose]);

  // Load selected design
  const loadDesign = useCallback(() => {
    if (!selectedDesign) return;

    const designData = localStorage.getItem(`${STORAGE_KEYS.DESIGN_PREFIX}${selectedDesign}`);
    if (designData) {
      const design: CloudDesign = JSON.parse(designData);
      onLoadDesign(design);
      toast({
        title: 'Design loaded',
        description: `"${design.name}" has been loaded.`,
        status: 'success',
        duration: 2000,
      });
      onClose();
    }
  }, [selectedDesign, onLoadDesign, toast, onClose]);

  // Export design
  const exportDesign = useCallback(() => {
    const designToExport = currentDesignId || selectedDesign;
    if (!designToExport) return;

    const designData = localStorage.getItem(`${STORAGE_KEYS.DESIGN_PREFIX}${designToExport}`);
    if (designData) {
      const design: CloudDesign = JSON.parse(designData);
      const blob = new Blob([JSON.stringify(design, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${design.name.toLowerCase().replace(/\s+/g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Design exported',
        description: `"${design.name}" has been exported.`,
        status: 'success',
        duration: 2000,
      });
    }
  }, [currentDesignId, selectedDesign, toast]);

  // Import design
  const importDesign = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const design: CloudDesign = JSON.parse(e.target?.result as string);
        design.id = crypto.randomUUID(); // Generate new ID to avoid conflicts
        design.createdAt = new Date().toISOString();
        design.updatedAt = new Date().toISOString();
        design.version = 1;

        // Save imported design
        localStorage.setItem(
          `${STORAGE_KEYS.DESIGN_PREFIX}${design.id}`,
          JSON.stringify(design)
        );

        // Update designs list
        const updatedDesigns = [...designs, {
          id: design.id,
          name: design.name,
          description: design.description,
          createdAt: design.createdAt,
          updatedAt: design.updatedAt,
          currentVersion: design.version,
        }];
        localStorage.setItem(STORAGE_KEYS.DESIGNS_LIST, JSON.stringify(updatedDesigns));
        setDesigns(updatedDesigns);

        toast({
          title: 'Design imported',
          description: `"${design.name}" has been imported.`,
          status: 'success',
          duration: 2000,
        });
      } catch (error) {
        toast({
          title: 'Import failed',
          description: 'Invalid design file format.',
          status: 'error',
          duration: 2000,
        });
      }
    };
    reader.readAsText(file);
  }, [designs, toast]);

  return (
    <>
      <VStack spacing={2} width="full">
        <Button
          leftIcon={<MdAdd />}
          onClick={onOpen}
          size="sm"
          width="full"
          colorScheme="blue"
        >
          New Design
        </Button>
        <Button
          leftIcon={<MdUpload />}
          size="sm"
          width="full"
          as="label"
          cursor="pointer"
        >
          Import Design
          <input
            type="file"
            accept=".json"
            style={{ display: 'none' }}
            onChange={importDesign}
          />
        </Button>
        {currentDesignId && (
          <Button
            leftIcon={<MdDownload />}
            onClick={exportDesign}
            size="sm"
            width="full"
          >
            Export Design
          </Button>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Designs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Load Existing Design</FormLabel>
                <Select
                  placeholder="Select a design"
                  value={selectedDesign}
                  onChange={(e) => setSelectedDesign(e.target.value)}
                >
                  {designs.map((design) => (
                    <option key={design.id} value={design.id}>
                      {design.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <Box width="full" height="1px" bg="gray.200" my={4} />

              <FormControl>
                <FormLabel>New Design Name</FormLabel>
                <Input
                  value={newDesignName}
                  onChange={(e) => setNewDesignName(e.target.value)}
                  placeholder="Enter design name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description (optional)</FormLabel>
                <Textarea
                  value={newDesignDescription}
                  onChange={(e) => setNewDesignDescription(e.target.value)}
                  placeholder="Enter design description"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={saveNewDesign}
              isDisabled={!newDesignName.trim()}
            >
              Save New
            </Button>
            <Button
              onClick={loadDesign}
              isDisabled={!selectedDesign}
            >
              Load Selected
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DesignManager;
