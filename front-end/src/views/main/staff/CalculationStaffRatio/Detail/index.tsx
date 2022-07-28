import React, { Component } from 'react';
import { DayPilot, DayPilotScheduler } from 'daypilot-pro-react';
import UIManager from 'core/UIManager';
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { range } from 'lodash';

import { SelectStaffModal } from './components';
import './styles.scss';
import { ratioClass } from 'assets/_mockApis/ratioClass';
import { ClassKecho } from 'types/class-kecho';
import { StaffKecho } from 'types/staff-kecho';
import { IInputSaveDetail } from '../List/Components/ClassTable';

const eventsFix = (date: string, start: string, end: string) => [
    {
        id: uuidv4(),
        text: '',
        start: `${date}T00:00:00`,
        end: `${date}T${start}`,
        resource: 'c',
        clickDisabled: true,
        moveDisabled: true,
        resizeDisabled: true,
        backColor: '#e3e3e3',
        fontColor: '#555555'
    },
    {
        id: uuidv4(),
        text: '',
        start: `${date}T00:00:00`,
        end: `${date}T${start}`,
        resource: 't1',
        clickDisabled: true,
        moveDisabled: true,
        backColor: '#e3e3e3',
        resizeDisabled: true,
        fontColor: '#555555f'
    },
    {
        id: uuidv4(),
        text: '',
        start: `${date}T00:00:00`,
        end: `${date}T${start}`,
        resource: 't2',
        clickDisabled: true,
        moveDisabled: true,
        resizeDisabled: true,
        backColor: '#e3e3e3',
        fontColor: '#555555f'
    },
    {
        id: uuidv4(),
        text: '',
        start: `${date}T00:00:00`,
        end: `${date}T${start}`,
        resource: 'ecda',
        clickDisabled: true,
        moveDisabled: true,
        resizeDisabled: true,
        backColor: '#e3e3e3',
        fontColor: '#555555f'
    },
    {
        id: uuidv4(),
        text: '',
        start: `${date}T00:00:00`,
        end: `${date}T${start}`,
        resource: 'brand',
        clickDisabled: true,
        moveDisabled: true,
        resizeDisabled: true,
        backColor: '#e3e3e3',
        fontColor: '#555555f'
    },
    {
        id: uuidv4(),
        text: '',
        start: `${date}T${end}`,
        end: `${date}T24:00:00`,
        resource: 'c',
        clickDisabled: true,
        moveDisabled: true,
        resizeDisabled: true,
        backColor: '#e3e3e3',
        fontColor: '#555555f'
    },
    {
        id: uuidv4(),
        text: '',
        start: `${date}T${end}`,
        end: `${date}T24:00:00`,
        resource: 't1',
        clickDisabled: true,
        moveDisabled: true,
        resizeDisabled: true,
        backColor: '#e3e3e3',
        fontColor: '#555555f'
    },
    {
        id: uuidv4(),
        text: '',
        start: `${date}T${end}`,
        end: `${date}T24:00:00`,
        resource: 't2',
        clickDisabled: true,
        moveDisabled: true,
        resizeDisabled: true,
        backColor: '#e3e3e3',
        fontColor: '#555555f'
    },
    {
        id: uuidv4(),
        text: '',
        start: `${date}T${end}`,
        end: `${date}T24:00:00`,
        resource: 'ecda',
        clickDisabled: true,
        moveDisabled: true,
        resizeDisabled: true,
        backColor: '#e3e3e3',
        fontColor: '#555555f'
    },
    {
        id: uuidv4(),
        text: '',
        start: `${date}T${end}`,
        end: `${date}T24:00:00`,
        resource: 'brand',
        clickDisabled: true,
        moveDisabled: true,
        resizeDisabled: true,
        backColor: '#e3e3e3',
        fontColor: '#555555f'
    }
];

interface IProps {
    detailClass: ClassKecho;
    date?: string;
    // ref: any;
}

interface IState {
    scheduler?: any;
    eventsRatio?: any;
    selectTeacher?: StaffKecho;
    selectAssistant?: StaffKecho;
    childClass: any;
    inputSave: IInputSaveDetail;
}

class Detail extends Component<IProps, IState> {
    private scheduler: any;
    brandClass: any = 'lfp';
    levelClass: any = 'k2';
    date: any = '2021-06-01';
    startTime = '06';
    endTime = '19';
    listTime = range(Number(this.startTime), Number(this.endTime));
    constructor(props: IProps) {
        super(props);
        // if (props.ref) props.ref(this);
        this.state = {
            scheduler: {
                // days: 31,
                scale: 'Hour',
                timeHeaders: [{ groupBy: 'Day' }, { groupBy: 'Hour', format: 'HH' }],
                cellWidthSpec: 'Auto',
                cellWidth: 50,
                durationBarVisible: false,
                treeEnabled: true,
                rowHeaderColumns: [{ name: 'Name' }, { name: 'level', display: 'level', width: 50 }],
                resources: [
                    {
                        name: props.detailClass.nameClass,
                        id: 'c',
                        expanded: true,
                        children: [
                            {
                                name: 'Teacher',
                                level: '',
                                id: 't1'
                            },
                            {
                                name: 'Teacher-Assistant',
                                level: '',
                                id: 't2'
                            }
                        ]
                    },
                    {
                        name: 'ECDA Ratio',
                        id: 'ecda'
                    },
                    {
                        name: 'Brand Ratio',
                        id: 'brand'
                    }
                ],
                events: []
            },
            eventsRatio: [],
            selectTeacher: undefined,
            selectAssistant: undefined,
            childClass: { 7: 25, 8: 25, 9: 25, 10: 25, 11: 25, 12: 25, 13: 30, 14: 30, 15: 30, 16: 30, 17: 30, 18: 30 },
            inputSave: {
                idRatio: props.detailClass?.idRatio
            }
        };
        this.date = props.date;
        this.brandClass = (props.detailClass?.branch || '')?.toLowerCase();
        this.levelClass = (props.detailClass?.level || '').toLowerCase();
    }

    componentDidMount = async () => {
        this.handleSetStaff();
        await this.handleGetChildOfClass();
        this.handleEventForClassRatio();
    };

    handleSetStaff = () => {
        const { detailClass } = this.props;
        const listStaff = detailClass.staff || [];
        if (listStaff.length > 0) {
            this.setState(
                produce((draf: any) => {
                    try {
                        if (listStaff[0]) {
                            const { staff, fromHour, toHour } = listStaff[0];

                            const startTime = fromHour > 10 ? `${fromHour}` : `0${fromHour}`;
                            const endTime = toHour > 10 ? `${toHour}` : `0${toHour}`;

                            const newEvent = {
                                id: uuidv4(),
                                text: `${startTime}h - ${endTime}h`,
                                start: `${this.date}T${startTime}:00:00`,
                                end: `${this.date}T${endTime}:00:00`,
                                resource: 't1',
                                cssClass: 'custom-event-scheduler-teacher'
                            };
                            draf.scheduler.events.push(newEvent);

                            draf.selectTeacher = staff;

                            draf.selectTeacher.start = startTime;
                            draf.selectTeacher.end = endTime;

                            draf.scheduler.resources[0].children[0].name = staff.nameStaff;
                            draf.scheduler.resources[0].children[0].level = staff.diploma;
                            draf.inputSave.idStaff1 = staff.id;
                            draf.inputSave.fromHourStaff1 = startTime;
                            draf.inputSave.toHourStaff1 = endTime;
                        }
                        if (listStaff[1]) {
                            const { staff, fromHour, toHour } = listStaff[1];

                            const startTime = fromHour > 10 ? `${fromHour}` : `0${fromHour}`;
                            const endTime = toHour > 10 ? `${toHour}` : `0${toHour}`;

                            const newEvent = {
                                id: uuidv4(),
                                text: `${startTime}h - ${endTime}h`,
                                start: `${this.date}T${startTime}:00:00`,
                                end: `${this.date}T${endTime}:00:00`,
                                resource: 't2',
                                cssClass: 'custom-event-scheduler-assistant'
                            };
                            draf.scheduler.events.push(newEvent);

                            draf.selectAssistant = staff;

                            draf.selectAssistant.start = startTime;
                            draf.selectAssistant.end = endTime;

                            draf.scheduler.resources[0].children[1].name = staff.nameStaff;
                            draf.scheduler.resources[0].children[1].level = staff.diploma;
                            draf.inputSave.idStaff2 = staff.id;
                            draf.inputSave.fromHourStaff2 = startTime;
                            draf.inputSave.toHourStaff2 = endTime;
                        }
                    } catch (error) {
                        // console.log(error);
                    }
                })
            );
        }
    };

    handleGetChildOfClass = () => {
        const { detailClass } = this.props;
        const numberChildFD = detailClass?.numberChildOfClass?.find((item) => item.key === 'FD').total;
        this.setState(
            produce((draf: any) => {
                this.listTime.forEach((item) => {
                    let numberChildPart = 0;
                    if (item <= 12) numberChildPart = detailClass?.numberChildOfClass?.find((time) => time.key === 'AM').total;
                    if (item > 12) numberChildPart = detailClass?.numberChildOfClass?.find((time) => time.key === 'PM').total;
                    draf.childClass[item] = numberChildPart > 0 ? numberChildPart : numberChildFD;
                });
            })
        );
    };

    handleEventForClassRatio = () => {
        // add events for class and ratio
        const { selectTeacher, selectAssistant, childClass } = this.state;

        this.setState(
            produce((draf: any) => {
                try {
                    const newEvents: any[] = [];
                    this.listTime.forEach((item) => {
                        const checkTimeTeacher =
                            range(Number(selectTeacher?.start) || 0, Number(selectTeacher?.end) || 0).indexOf(item) >= 0;
                        const checkTimeAssistant =
                            range(Number(selectAssistant?.start) || 0, Number(selectAssistant?.end) || 0).indexOf(item) >= 0;

                        const checkTime = checkTimeTeacher || checkTimeAssistant;

                        const ratioBrand = ratioClass[this.brandClass][this.levelClass];
                        const ratioEcda = ratioClass.ecda[this.levelClass];

                        const totalBrand = (checkTimeTeacher ? ratioBrand?.teacher : 0) + (checkTimeAssistant ? ratioBrand?.assistant : 0);
                        const totalECDA = (checkTimeTeacher ? ratioEcda?.teacher : 0) + (checkTimeAssistant ? ratioEcda?.assistant : 0);
                        const validEcda = totalECDA >= childClass[item] && checkTime;
                        const validBrand = totalBrand >= childClass[item] && checkTime;

                        const numberStaff = Number(checkTimeTeacher) + Number(checkTimeAssistant);

                        newEvents.push({
                            id: uuidv4(),
                            text: childClass[item],
                            start: `${this.date}T${item < 10 ? `0${item}` : `${item}`}:00:00`,
                            end: `${this.date}T${item < 10 ? `0${item}` : `${item}`}:00:00`,
                            resource: 'c',
                            clickDisabled: true,
                            moveDisabled: true,
                            backColor: '#e3e3e3',
                            fontColor: '#555555f'
                        });

                        newEvents.push({
                            id: uuidv4(),
                            text: numberStaff,
                            start: `${this.date}T${item < 10 ? `0${item}` : `${item}`}:00:00`,
                            end: `${this.date}T${item < 10 ? `0${item}` : `${item}`}:00:00`,
                            resource: 'ecda',
                            clickDisabled: true,
                            moveDisabled: true,
                            backColor: validEcda ? '#34c134' : 'red',
                            fontColor: '#555555f'
                        });
                        newEvents.push({
                            id: uuidv4(),
                            text: numberStaff,
                            start: `${this.date}T${item < 10 ? `0${item}` : `${item}`}:00:00`,
                            end: `${this.date}T${item < 10 ? `0${item}` : `${item}`}:00:00`,
                            resource: 'brand',
                            clickDisabled: true,
                            moveDisabled: true,
                            backColor: validBrand ? '#34c134' : 'red',
                            fontColor: '#555555f'
                        });
                    });
                    draf.eventsRatio = newEvents;
                } catch (error) {
                    // console.log(error);
                }
            })
        );
    };

    handleCheckTime = (start: any, end: any) => {
        if (Number(start?.getHours() || 0) < Number(this.startTime)) return false;
        if (Number(end?.getHours() || 0) > Number(this.endTime)) return false;
        return true;
    };

    handleSelectStaff = async (item: StaffKecho, arg: any) => {
        const start = arg.start || arg.newStart || new DayPilot.Date(arg.e?.data?.start);
        const end = arg.end || arg.newEnd || new DayPilot.Date(arg.e?.data?.end);
        const resource = arg.resource || arg.e?.data?.resource;
        const checkTime = this.handleCheckTime(start, end);
        if (!checkTime) return;
        await this.setState(
            produce((draf: any) => {
                try {
                    const newEvent = {
                        id: uuidv4(),
                        text: `${this.startTime}h - ${this.endTime}h`,
                        start: `${this.date}T${this.startTime}:00:00`,
                        end: `${this.date}T${this.endTime}:00:00`,
                        resource,
                        cssClass: resource === 't1' ? 'custom-event-scheduler-teacher' : 'custom-event-scheduler-assistant'
                    };
                    const findEvent = draf.scheduler.events.find((event: any) => event.resource === resource);

                    if (!findEvent) draf.scheduler.events.push(newEvent);
                    else {
                        findEvent.text = `${start?.getHours()}h - ${end?.getHours()}h`;
                        findEvent.start = start;
                        findEvent.end = end;
                    }

                    const startTime = findEvent ? start?.getHours() : this.startTime;
                    const endTime = findEvent ? end?.getHours() : this.endTime;
                    if (resource === 't1') {
                        draf.selectTeacher = item;
                        draf.selectTeacher.start = startTime;
                        draf.selectTeacher.end = endTime;
                        draf.scheduler.resources[0].children[0].name = item.nameStaff;
                        draf.scheduler.resources[0].children[0].level = item.level || item.cert?.diploma;
                        draf.inputSave.idStaff1 = item.id;
                        draf.inputSave.fromHourStaff1 = startTime;
                        draf.inputSave.toHourStaff1 = endTime;
                    } else if (resource === 't2') {
                        draf.selectAssistant = item;
                        draf.selectAssistant.start = startTime;
                        draf.selectAssistant.end = endTime;
                        draf.scheduler.resources[0].children[1].name = item.nameStaff;
                        draf.scheduler.resources[0].children[1].level = item.level || item.cert?.diploma;
                        draf.inputSave.idStaff2 = item.id;
                        draf.inputSave.fromHourStaff2 = startTime;
                        draf.inputSave.toHourStaff2 = endTime;
                    }
                } catch (error) {
                    // console.log(error);
                }
            })
        );
        await this.handleEventForClassRatio();
    };

    handleOpenSelectStaffModal = (arg: any, openModal = false) => {
        const { selectTeacher, selectAssistant } = this.state;
        const { detailClass } = this.props;
        let staff: any = {};
        let type = 'all';
        const resource = arg.resource || arg.e?.data?.resource;
        if (resource === 't1') {
            staff = selectTeacher;
            type = 'teacher';
        } else if (resource === 't2') {
            staff = selectAssistant;
        }

        if (openModal) this.handleSelectStaff(staff, arg);
        else
            UIManager.showModal({
                content: (onClose: any) => (
                    <SelectStaffModal
                        selectedStaff={staff}
                        onClose={onClose}
                        detailClass={detailClass}
                        onSelectStaff={(item: any) => this.handleSelectStaff(item, arg)}
                        type={type}
                    />
                )
            });
    };

    render() {
        const { scheduler, eventsRatio } = this.state;
        return (
            <div>
                <DayPilotScheduler
                    {...scheduler}
                    startDate={this.date}
                    events={[
                        ...scheduler.events,
                        ...eventsRatio,
                        ...eventsFix(this.date, `${this.startTime}:00:00`, `${this.endTime}:00:00`)
                    ]}
                    onEventMoved={(arg) => this.handleOpenSelectStaffModal(arg, true)}
                    onEventResized={(arg) => this.handleOpenSelectStaffModal(arg, true)}
                    onTimeRangeSelected={(arg) => this.handleOpenSelectStaffModal(arg)}
                    onEventClick={(arg) => this.handleOpenSelectStaffModal(arg)}
                    ref={(component: any) => {
                        this.scheduler = component && component.control;
                    }}
                />
            </div>
        );
    }
}

export default Detail;
