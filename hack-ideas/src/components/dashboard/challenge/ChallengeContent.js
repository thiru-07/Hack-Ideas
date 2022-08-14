import React, { useEffect, useState, useCallback } from 'react'
import { Button, Modal, Table, Popconfirm, Radio, Input, Tooltip } from 'antd';
import { getAuth } from 'firebase/auth';
import { getDb } from '../../../firebase/firebase';
import { collection, deleteDoc, doc, getDocs, getDoc, query, setDoc, updateDoc } from 'firebase/firestore';
import { DeleteOutlined, LikeOutlined } from '@ant-design/icons';
import './Challenge.css';

const ChallengeContent = () => {
    /**
     *  Challenge table component with required methods and UI tags.
     */
    const auth = getAuth();
    const user = auth.currentUser;
    const [challenges, setChallenges] = useState([]);
    const [challenge, setChallenge] = useState("");
    const [description, setDescription] = useState("");
    const [challengeModalVisible, setModalVisibility] = useState(false);
    const [selectedTag, setSelectedTag] = useState("");
    const [upVotedUsers, setUpVotes] = useState([]);
    const { TextArea } = Input;


    const fetchChallenges = useCallback(async () => {
        /**
         * Asynchronous Function to get the challenges from Firestore whenever the user is changed.
         * useCallback hook is used in order to optimize the performance of the application.
         */
        if (user && user.uid) {
            const db = getDb();
            const q = query(collection(db, "challenges"))

            try {
                const results = await getDocs(q);
                let resultChallenges = []
                results.forEach((eachDoc, i) => {
                    resultChallenges.push({ ...eachDoc.data(), key: eachDoc.id })
                })
                setChallenges(resultChallenges);
            } catch (err) {
                console.log(err)
            }
        }

    }, [user])

    useEffect(() => {
        fetchChallenges()
    }, [user])

    const addChallenge = async () => {
        /**
         * Asynchronous Function to add the challenge to the Firestore and local state.
         * This Method fetchs the required collection from the Firestore and adds the new challenge to the Firestore.
         */
        const db = getDb();
        const newTaskRef = doc(collection(db, "challenges"));
        await setDoc(newTaskRef, {
            name: challenge,
            user: user.uid,
            date: new Date().toLocaleString(),
            desc: description,
            owner: user.displayName,
            tag: selectedTag,
            upVotes: [],
        })
        fetchChallenges()
        setModalVisibility(false)
    }

    const addUpVote = async (id) => {
        /**
         * Asynchronous Function to add upvotes to a challenge.
         * This Method fetchs the upvoted challenge from the firestore using its ID and updates the upvotes.
         * @param {string} id - Challenge ID
         */
        const db = getDb();
        const docRef = doc(db, "challenges", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const existingUpvotes = docSnap.data().upVotes
            const arr = [...existingUpvotes];
            if (existingUpvotes.includes(user.displayName)) { //Checking if the user has already upvoted and removing it if upvoted.
                const elementInd = arr.indexOf(user.displayName)
                arr.splice(elementInd, 1);
            }
            else {
                arr.push(user.displayName)
            }
            setUpVotes(arr)
            await updateDoc(docRef, { upVotes: arr })
        }
    }


    const deleteChallenge = async (id) => {
        /**
         * Asynchronous Function to delete a challenge .
         * This Method fetchs the challenge to be deleted from the Firestore using the challenge ID and removes it.
         * @param {string} id - Challenge ID
         */
        const db = getDb();
        try {
            await deleteDoc(doc(db, "challenges", id));
            fetchChallenges()
        }
        catch (e) {
            console.log(e)
        }
    }

    const columns = [
        /**
         * Array of objects required by the Challenge Table UI to display the column headers and its features.
         */
        {
            title: 'Challenge',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'desc',
        },
        {
            title: 'Date Created',
            dataIndex: 'date',
            sorter: (a, b) => new Date(b.date) - new Date(a.date),
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            filters: [
                {
                    text: 'Feature',
                    value: 'Feature',
                },
                {
                    text: 'Tech',
                    value: 'Tech',
                },
                {
                    text: 'Bug',
                    value: 'Bug',
                }
            ],
            onFilter: (value, record) => record.tag === value,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) =>
                challenges.length >= 1 ? (
                    <>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteChallenge(record.key)}>
                            <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
                        </Popconfirm>
                        <Tooltip title={upVotedUsers.length !== 0 ? (upVotedUsers.map((each, i) => (each + "\n"))) : "No Upvotes"}>
                            <Button type="primary" shape="circle" icon={<LikeOutlined onClick={() => addUpVote(record.key)} />}></Button>
                        </Tooltip>
                    </>
                ) : null,
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => setModalVisibility(true)}>
                Add Challenge
            </Button>
            <Modal
                title="Add Challenge"
                centered
                visible={challengeModalVisible}
                onOk={() => addChallenge()}
                onCancel={() => setModalVisibility(false)}
                okButtonProps={{
                    disabled: (challenge === ""),
                }}
                cancelButtonProps={{
                    disabled: (challenge === ""),
                }}
            >
                <div>
                    <div style={{ display: 'flex' }}>
                        <span className="title-modal-div">Title</span>
                        <TextArea
                            placeholder="Enter the title of the challenge"
                            type="text"
                            value={challenge}
                            onChange={(e) => setChallenge(e.target.value)}
                            className="challenge-input-box"
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <span className="title-modal-div">Description</span>
                        <TextArea
                            placeholder="Enter the description of the challenge"
                            type="text"
                            value={description}
                            rows={6}
                            onChange={(e) => setDescription(e.target.value)}
                            className="challenge-input-box-desc"
                        />
                    </div>
                    <span className="title-modal-div">Tags</span>
                    <Radio.Group className="tag-div" onChange={(e) => setSelectedTag(e.target.value)} value={selectedTag}>
                        <Radio value="Feature">Feature</Radio>
                        <Radio value="Tech">Tech</Radio>
                        <Radio value="Bug">Bug</Radio>
                    </Radio.Group>

                </div>
            </Modal>
            <Table columns={columns} dataSource={challenges} />
        </>
    )
}


export default ChallengeContent