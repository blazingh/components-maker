import TooltipButton from "./ui/tooltipButton";
import { } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import React from "react";
import {
  BlockContentType,
  BlocksTree,
  ButtonUtils,
  ContainerUtils,
  ImageUtils,
  TextUtils,
} from "@/types/types";
import Position from "./porpreties/position";
import Layout from "./porpreties/layout";
import { Typography } from "./porpreties/typography";
import Size from "./porpreties/size";
import Border from "./porpreties/borber";
import Background from "./porpreties/background";
import Padding from "./porpreties/padding";
import Margin from "./porpreties/margin";
import { Trash } from "lucide-react";
import { ButtonContent } from "./content/buttonContent";
import ImageContent from "./content/imageContent";
import { TextContent } from "./content/textContent";
import { ContainerContent } from "./content/containerContent";

export default function ComponentsEditBar({
  activeBlockId,
  blocks,
  containerUtils,
  textUtils,
  imageUtils,
  buttonUtils,
}: {
  activeBlockId: string;
  blocks: BlocksTree;
  containerUtils: ContainerUtils;
  textUtils: TextUtils;
  imageUtils: ImageUtils;
  buttonUtils: ButtonUtils;
}) {
  // get the selected component
  const selectedBlock = blocks[activeBlockId];

  // if no component is selected, return null
  if (!selectedBlock) return <div>No component selected </div>;

  const addBlock = (parent: string, type: BlockContentType) => {
    if (type === BlockContentType.Text) textUtils.add(parent);

    if (type === BlockContentType.Image) imageUtils.add(parent);

    if (type === BlockContentType.Button) buttonUtils.add(parent);

    if (type === BlockContentType.Container) containerUtils.add(parent);
  };

  // if the selected component is a text component
  if (selectedBlock?.type === BlockContentType.Text) {
    return (
      <>
        <TextContent textUtils={textUtils} selectedBlock={selectedBlock} />

        <PropretyEditorsList
          styles={selectedBlock?.style}
          setStyles={(attr: string, value: any) =>
            textUtils.updateStyle(attr, value)
          }
        />

        {/* button to delete a component */}
        <TooltipButton
          variant="destructive"
          onClick={() => textUtils.remove()}
          tooltipText="delete the text block"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Block
        </TooltipButton>
      </>
    );
  }

  // if the selected component is an image component
  if (selectedBlock?.type === BlockContentType.Image) {
    return (
      <>
        <ImageContent imageUtils={imageUtils} selectedBlock={selectedBlock} />

        <PropretyEditorsList
          styles={selectedBlock?.style}
          setStyles={(atr: any, value: any) =>
            imageUtils.updateStyle(atr, value)
          }
        />

        <TooltipButton
          variant="destructive"
          onClick={() => imageUtils.remove()}
          tooltipText="delete the image block"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Block
        </TooltipButton>
      </>
    );
  }

  // if the selected component is a button component
  if (selectedBlock?.type === BlockContentType.Button) {
    return (
      <>
        <ButtonContent
          buttonUtils={buttonUtils}
          selectedBlock={selectedBlock}
        />

        <PropretyEditorsList
          styles={selectedBlock?.style}
          setStyles={(atr: any, value: any) =>
            buttonUtils.updateStyle(atr, value)
          }
        />

        <TooltipButton
          variant="destructive"
          onClick={() => buttonUtils.remove()}
          tooltipText="delete the button block"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Block
        </TooltipButton>
      </>
    );
  }

  // if the selected component is a container component
  if (selectedBlock?.type === BlockContentType.Container) {
    return (
      <>
        <ContainerContent
          blocks={blocks}
          containerUtils={containerUtils}
          selectedBlock={selectedBlock}
          addBlock={addBlock}
        />

        <PropretyEditorsList
          styles={selectedBlock?.style}
          setStyles={(atr: any, value: any) =>
            containerUtils.updateStyle(atr, value)
          }
        />

        <TooltipButton
          variant="destructive"
          onClick={() => containerUtils.remove(selectedBlock.id)}
          tooltipText="delete the container block and all its children"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Block
        </TooltipButton>
      </>
    );
  }
}

interface PropretyEditorsListProps {
  styles: any;
  setStyles: (attr: string, value: any) => void;
}

function PropretyEditorsList({ styles, setStyles }: PropretyEditorsListProps) {
  return (
    <Accordion type="single" collapsible>
      {/* input to change the position of a block */}
      <AccordionItem value="Move Block">
        <AccordionTrigger>Position</AccordionTrigger>
        <AccordionContent>
          <Position styles={styles} setStyles={setStyles} />
        </AccordionContent>
      </AccordionItem>
      {/* input to change the layout of a block */}
      <AccordionItem value="Layout">
        <AccordionTrigger>Layout</AccordionTrigger>
        <AccordionContent>
          <Layout styles={styles} setStyles={setStyles} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Block Size">
        <AccordionTrigger>Size</AccordionTrigger>
        <AccordionContent>
          <Size styles={styles} setStyles={setStyles} />
        </AccordionContent>
      </AccordionItem>
      {/* input to change the  margin of a block */}
      <AccordionItem value="Block Margin">
        <AccordionTrigger>Margin</AccordionTrigger>
        <AccordionContent>
          <Margin styles={styles} setStyles={setStyles} />
        </AccordionContent>
      </AccordionItem>
      {/* input to change the padding of a block */}
      <AccordionItem value="Block Padding">
        <AccordionTrigger>Padding</AccordionTrigger>
        <AccordionContent>
          <Padding styles={styles} setStyles={setStyles} />
        </AccordionContent>
      </AccordionItem>
      {/* input to change the border of a block */}
      <AccordionItem value="Block Border">
        <AccordionTrigger>Border</AccordionTrigger>
        <AccordionContent>
          <Border styles={styles} setStyles={setStyles} />
        </AccordionContent>
      </AccordionItem>
      {/* input to change the background of a block */}
      <AccordionItem value="Block Color">
        <AccordionTrigger>Background</AccordionTrigger>
        <AccordionContent>
          <Background styles={styles} setStyles={setStyles} />
        </AccordionContent>
      </AccordionItem>
      {/* input to change the typography of a block */}
      <AccordionItem value="Block Typography">
        <AccordionTrigger>Typography</AccordionTrigger>
        <AccordionContent>
          <Typography styles={styles} setStyles={setStyles} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
