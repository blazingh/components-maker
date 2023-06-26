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
import { Content } from "./porpreties/content";
import { Typography } from "./porpreties/typography";
import Size from "./porpreties/size";
import Border from "./porpreties/borber";
import Background from "./porpreties/background";
import Padding from "./porpreties/padding";
import Margin from "./porpreties/margin";
import { Trash } from "lucide-react";
import { InputWithLabel } from "./inputs/inputWithLabel";

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
    if (type === BlockContentType.Text) textUtils.addText(parent);

    if (type === BlockContentType.Image) imageUtils.addImage(parent);

    if (type === BlockContentType.Button) buttonUtils.addButton(parent);

    if (type === BlockContentType.Container)
      containerUtils.addContainer(parent);
  };

  // if the selected component is a text component
  if (selectedBlock?.type === BlockContentType.Text) {
    return (
      <>
        {/* input to change the name of a component */}
        <InputWithLabel
          label="Block Name"
          placeholder="Block Name"
          type="text"
          value={selectedBlock?.name || ""}
          onChange={(e: any) =>
            textUtils.updateTextName(activeBlockId, e.target.value)
          }
        />

        {/* input to change the text style of a component */}
        <Accordion type="single" collapsible>
          {/* input to change the content of a component */}
          <AccordionItem value="Edit Content">
            <AccordionTrigger>Content</AccordionTrigger>
            <AccordionContent>
              <Content
                buttonUtils={buttonUtils}
                blocks={blocks}
                imageUtils={imageUtils}
                selectedBlock={selectedBlock}
                textUtils={textUtils}
                addBlock={addBlock}
              />
            </AccordionContent>
          </AccordionItem>

          {/* input to change the text style of a component */}
          <AccordionItem value="Typography">
            <AccordionTrigger>Typography</AccordionTrigger>
            <AccordionContent>
              <Typography
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  textUtils.updateTextStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>

          {/* input to change the size of a component */}
          <AccordionItem value="Component Size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              <Size
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  textUtils.updateTextStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>

          {/* input to change the background of a component */}
          <AccordionItem value="Component Color">
            <AccordionTrigger>Background</AccordionTrigger>
            <AccordionContent>
              <Background
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  textUtils.updateTextStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* button to delete a component */}
        <TooltipButton
          variant="destructive"
          onClick={() => textUtils.removeText(activeBlockId)}
          tooltipText="delete the block"
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
        {/* input to change the name of a component */}
        <InputWithLabel
          label="Block Name"
          placeholder="Block Name"
          type="text"
          value={selectedBlock?.name || ""}
          onChange={(e) =>
            imageUtils.updateImageName(activeBlockId, e.target.value)
          }
        />

        <Accordion type="single" collapsible>
          {/* input to change the content of a component */}
          <AccordionItem value="Edit Content">
            <AccordionTrigger>Content</AccordionTrigger>
            <AccordionContent>
              <Content
                blocks={blocks}
                buttonUtils={buttonUtils}
                selectedBlock={selectedBlock}
                textUtils={textUtils}
                addBlock={addBlock}
                imageUtils={imageUtils}
              />
            </AccordionContent>
          </AccordionItem>
          {/* input to change the size of a component */}
          <AccordionItem value="Component Size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              <Size
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  imageUtils.updateImageStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>
          {/* input to change the border of a component */}
          <AccordionItem value="Component Border">
            <AccordionTrigger>Border</AccordionTrigger>
            <AccordionContent>
              <Border
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  imageUtils.updateImageStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>
          {/* input to change the background of a component */}
          <AccordionItem value="Component Color">
            <AccordionTrigger>Background</AccordionTrigger>
            <AccordionContent>
              <Background
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  imageUtils.updateImageStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    );
  }

  // if the selected component is a button component
  if (selectedBlock?.type === BlockContentType.Button) {
    return (
      <>
        {/* input to change the name of a component */}
        <InputWithLabel
          label="Block Name"
          placeholder="Block Name"
          type="text"
          value={selectedBlock?.name || ""}
          onChange={(e) =>
            buttonUtils.updateButtonName(activeBlockId, e.target.value)
          }
        />

        {/* input to change the content of a component */}
        <Accordion type="single" collapsible>
          <AccordionItem value="Edit Content">
            <AccordionTrigger>Content</AccordionTrigger>
            <AccordionContent>
              <Content
                buttonUtils={buttonUtils}
                blocks={blocks}
                selectedBlock={selectedBlock}
                textUtils={textUtils}
                addBlock={addBlock}
                imageUtils={imageUtils}
              />
            </AccordionContent>
          </AccordionItem>
          {/* input to change the size of a component */}
          <AccordionItem value="Component Size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              <Size
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  buttonUtils.updateButtonStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>
          {/* input to change the border of a component */}
          <AccordionItem value="Component Border">
            <AccordionTrigger>Border</AccordionTrigger>
            <AccordionContent>
              <Border
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  buttonUtils.updateButtonStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>
          {/* input to change the background of a component */}
          <AccordionItem value="Component Color">
            <AccordionTrigger>Background</AccordionTrigger>
            <AccordionContent>
              <Background
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  buttonUtils.updateButtonStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    );
  }

  // if the selected component is a container component
  if (selectedBlock?.type === BlockContentType.Container) {
    return (
      <>
        {/* input to change the name of a component */}
        <InputWithLabel
          label="Block Name"
          placeholder="Block Name"
          type="text"
          value={selectedBlock?.name || ""}
          onChange={(e) =>
            containerUtils.updateContainerName(activeBlockId, e.target.value)
          }
        />

        <Accordion type="single" collapsible>
          <AccordionItem value="Edit Content">
            <AccordionTrigger>Content</AccordionTrigger>
            <AccordionContent>
              <Content
                blocks={blocks}
                textUtils={textUtils}
                buttonUtils={buttonUtils}
                imageUtils={imageUtils}
                selectedBlock={selectedBlock}
                addBlock={addBlock}
              />
            </AccordionContent>
          </AccordionItem>

          {/* input to change the position of a component */}
          <AccordionItem value="Move Component">
            <AccordionTrigger>Position</AccordionTrigger>
            <AccordionContent>
              <Position
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  containerUtils.updateContainerStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>

          {/* input to change the layout of a component */}
          <AccordionItem value="Layout">
            <AccordionTrigger>Layout</AccordionTrigger>
            <AccordionContent>
              <Layout
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  containerUtils.updateContainerStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>

          {/* input to change the width and height of a component */}
          <AccordionItem value="Component Size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              <Size
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  containerUtils.updateContainerStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>

          {/* input to change the  margin of a component */}
          <AccordionItem value="Component Margin">
            <AccordionTrigger>Margin</AccordionTrigger>
            <AccordionContent>
              <Margin
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  containerUtils.updateContainerStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>

          {/* input to change the padding of a component */}
          <AccordionItem value="Component Padding">
            <AccordionTrigger>Padding</AccordionTrigger>
            <AccordionContent>
              <Padding
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  containerUtils.updateContainerStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>

          {/* input to change the background of a component */}
          <AccordionItem value="Component Color">
            <AccordionTrigger>Background</AccordionTrigger>
            <AccordionContent>
              <Background
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  containerUtils.updateContainerStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>

          {/* input to change the border of a component */}
          <AccordionItem value="Component Border">
            <AccordionTrigger>Border</AccordionTrigger>
            <AccordionContent>
              <Border
                styles={selectedBlock?.style}
                setStyles={(atr: any, value: any) =>
                  containerUtils.updateContainerStyle(activeBlockId, atr, value)
                }
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* button to delete a component */}
        <TooltipButton
          variant="destructive"
          onClick={() => containerUtils.removeContainer(activeBlockId)}
          tooltipText="delete the block and all its children"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Block
        </TooltipButton>
      </>
    );
  }
}
