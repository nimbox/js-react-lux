import React, { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Navigator, Panel } from '../layouts/helium/Helium';


//
// ApplicationNavigator
//

interface Item {
    name: string,
    to: string
}

interface Group {
    name: string,
    items: Item[]
}

export interface Props {
    items: (Group | Item)[],
    onSupport: () => void
}

export const ApplicationNavigator: FC<Props> = ({ items, onSupport }) => {

    const { t, ready } = useTranslation();

    return (
        <>

            <Navigator.Content className="p-3">
                <Panel className="-mx-3">
                    {ready && items.map((i) => (
                        (i as Group).items ?
                            <Fragment key={i.name} >
                                <Panel.Group>{t(i.name)}</Panel.Group>
                                {(i as Group).items.map((j) =>
                                    <Link to={j.to}>
                                        <Panel.Item key={j.name} active={false}>{t(j.name)}</Panel.Item>
                                    </Link>
                                )}
                            </Fragment>
                            :
                            <Link to={(i as Item).to}>
                                <Panel.Item active={false}>{t(i.name)}</Panel.Item>
                            </Link>
                    ))}
                </Panel>
            </Navigator.Content>

            <Navigator.Footer className="px-3 py-2">
                <div onClick={onSupport} className="flex flex-row items-center justify-between cursor-pointer">
                    <div>
                        <div className="">Soporte</div>
                        <div className="text-xs text-muted">Solicita ayuda aquí</div>
                    </div>
                    <div className="w-6 text-center rounded-full bg-navigator text-navigator-bg">?</div>
                </div>
            </Navigator.Footer>

            <Navigator.Footer className="px-3 py-2">
                <div className="text-xs text-muted">© 2020 Nimbox Technologies LTD</div>
            </Navigator.Footer>

        </>
    );

};
