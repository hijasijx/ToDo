import React, { useEffect, useState } from "react";
import styled from "styled-components";
import plus from "../assets/plus.svg";

export default function ToDo() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Buy 1 kg Tomato",
    },
    {
      id: 2,
      name: "Buy 2 kg Onion",
    },
    {
      id: 3,
      name: "Visit friend",
    },
    {
      id: 4,
      name: "Clean House",
    },
  ]);
  const [completed, setCompleted] = useState([
    {
      id: 5,
      name: "Washing Clothes",
    },
    {
      id: 6,
      name: "Play Cricket",
    },
    {
      id: 7,
      name: "1 km Walking",
    },
    {
      id: 8,
      name: "Do Homework",
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [itemCount, setItemCount] = useState();

  useEffect(() => {
    setItemCount(completed.length + items.length);
  }, []);

  const deleteItem = (id) => {
    let new_list = items.filter((item) => item.id !== id);
    setItems(new_list);
  };

  const deleteCompleted = (id) => {
    let new_list = completed.filter((item) => item.id !== id);
    setCompleted(new_list);
  };

  const completedTask = (id) => {
    let current_task = items.find((item) => item.id == id);
    setCompleted([...completed, current_task]);

    let new_list = items.filter((item) => item.id !== id);
    setItems(new_list);
  };

  const revertTask = (id) => {
    let current_task = completed.find((item) => item.id == id);
    setItems([...items, current_task]);

    let new_list = completed.filter((item) => item.id !== id);
    setCompleted(new_list);
  };

  const renderItems = () => {
    return items.map((item) => (
      <Listitem>
        <Leftitem onClick={() => completedTask(item.id)}>
          <Span></Span>
          <Item>
            {item.id}, {item.name}
          </Item>
        </Leftitem>
        <Rightitem>
          <Butndlt onClick={() => deleteItem(item.id)}>
            <Dltimg
              src={require("../assets/delete.svg").default}
              alt="delete-img"
            />
          </Butndlt>
        </Rightitem>
      </Listitem>
    ));
  };

  const renderCompleted = () => {
    return completed.map((item) => (
      <Listitem>
        <Leftcomplite>
          <Spantick>
            <Tickimg src={require("../assets/tick-green.svg").default} />
          </Spantick>
          <Completetext>
            {item.id}, {item.name}
          </Completetext>
        </Leftcomplite>
        <Rightcomplite>
          <Backbtn onClick={() => revertTask(item.id)}>
            <Backimg src={require("../assets/revert.svg").default} />
          </Backbtn>
          <Butndlt onClick={() => deleteCompleted(item.id)}>
            <Dltimg src={require("../assets/delete.svg").default} />
          </Butndlt>
        </Rightcomplite>
      </Listitem>
    ));
  };

  const addNewItem = (e) => {
    e.preventDefault();
    let new_item = {
      id: itemCount + 1,
      name: newTask,
    };
    setItems([...items, new_item]);
    setNewTask("");
    setItemCount((prev) => prev + 1);
  };

  return (
    <Section>
      <Div>
        <Heading>Todo List</Heading>
        <Subheading>Things to be done</Subheading>
        <Items>{renderItems()}</Items>
        <Inputdiv>
          <Plusimg src={plus} alt="plus-img" />
          <Input
            placeholder="Type new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={(e) => addNewItem(e)}>Add New</Button>
        </Inputdiv>
        <Subheading>Completed</Subheading>
        <Compliteditems>{renderCompleted()}</Compliteditems>
      </Div>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  height: 100%;
`;

const Div = styled.div`
  width: 50vw;
  margin: 0 auto;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
`;

const Heading = styled.h1`
  text-align: center;
  color: black;
  font-weight: 600;
  font-size: 35px;
  padding-top: 60px;
`;

const Subheading = styled.h3`
  color: #040241;
  font-size: 25px;
  font-weight: 600;
  margin-left: 80px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Items = styled.ul``;

const Listitem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 40%;
  margin: 0 auto;
  flex-wrap: wrap;
  margin-bottom: 15px;
  cursor: pointer;
`;

const Item = styled.h3`
  margin-bottom: 10px;
`;

const Inputdiv = styled.div`
  position: relative;
  margin-left: 190px;
`;

const Plusimg = styled.img`
  position: absolute;
  top: 12px;
  left: 7px;
`;

const Input = styled.input`
  border: 1px solid gray;
  padding: 13px 35px;
  &::placeholder {
    font-size: 16px;
  }
`;

const Button = styled.button`
  padding: 14px 15px;
  background: #040241;
  color: white;
  font-size: 14px;
  border-radius: 7px;
  position: absolute;
  right: 180px;
  cursor: pointer;
`;

const Compliteditems = styled.ul``;

const Leftitem = styled.div`
  display: flex;
`;

const Span = styled.span`
  border: 2px solid #040241;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-right: 10px;
`;

const Rightitem = styled.div``;

const Butndlt = styled.button`
  cursor: pointer;
`;

const Dltimg = styled.img``;

const Leftcomplite = styled.div`
  display: flex;
`;

const Spantick = styled.span`
  border: 2px solid #00c28b;
  border-radius: 50%;
  width: 22px;
  height: 20px;
  display: inline-block;
  margin-right: 10px;
  position: relative;
`;

const Tickimg = styled.img`
  width: 17px;
  position: absolute;
`;

const Completetext = styled.h3`
  margin-bottom: 20px;
`;

const Rightcomplite = styled.div`
  display: flex;
`;

const Backbtn = styled.button`
  margin-right: 10px;
`;

const Backimg = styled.img``;
